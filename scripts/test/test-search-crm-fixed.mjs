#!/usr/bin/env node

/**
 * Тестовый скрипт для проверки исправленного поиска лидов через Bitrix24Client
 * Использует исправленный метод searchCRMByPhone с правильными параметрами TYPE, VALUES, ENTITY_TYPE
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Загружаем переменные окружения
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

// Получаем BITRIX24_WEBHOOK_URL из .env или используем значение по умолчанию
const BITRIX24_WEBHOOK_URL = process.env.BITRIX24_WEBHOOK_URL || 
  'https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/';

console.log('🔍 Тестирование исправленного поиска лидов через Bitrix24Client\n');
console.log(`Webhook URL: ${BITRIX24_WEBHOOK_URL}\n`);

// Импортируем Bitrix24Client из собранного кода
// Сначала нужно собрать проект: npm run build
let Bitrix24Client;
try {
  const clientPath = join(projectRoot, 'build/bitrix24/client.js');
  const clientModule = await import(`file://${clientPath}`);
  Bitrix24Client = clientModule.Bitrix24Client;
  console.log('✅ Bitrix24Client загружен из build/bitrix24/client.js\n');
} catch (error) {
  console.error('❌ Ошибка загрузки Bitrix24Client:', error.message);
  console.error('\n💡 Сначала соберите проект: npm run build\n');
  process.exit(1);
}

async function testSearchByPhone(phone, entityTypes = ['lead']) {
  try {
    console.log(`📞 Поиск по телефону: ${phone}`);
    console.log(`   Типы сущностей: ${entityTypes.join(', ')}\n`);
    
    const client = new Bitrix24Client(BITRIX24_WEBHOOK_URL);
    
    // Используем исправленный метод searchCRMByPhone
    const results = await client.searchCRMByPhone(phone, entityTypes);
    
    console.log('📊 Результаты поиска:');
    console.log(JSON.stringify(results, null, 2));
    
    if (results && results.LEAD && results.LEAD.length > 0) {
      console.log(`\n✅ Найдено ${results.LEAD.length} лид(ов) с номером ${phone}`);
      
      // Получаем детали каждого лида
      for (const leadId of results.LEAD) {
        try {
          await new Promise(resolve => setTimeout(resolve, 500)); // Задержка для rate limit
          
          const lead = await client.getLead(leadId);
          console.log(`\n📋 Лид ID: ${lead.ID}`);
          console.log(`   Название: ${lead.TITLE || 'N/A'}`);
          console.log(`   Имя: ${lead.NAME || ''} ${lead.LAST_NAME || ''}`.trim() || 'N/A');
          console.log(`   Компания: ${lead.COMPANY_TITLE || 'N/A'}`);
          console.log(`   Телефон: ${JSON.stringify(lead.PHONE || [])}`);
          console.log(`   Email: ${JSON.stringify(lead.EMAIL || [])}`);
          console.log(`   Статус: ${lead.STATUS_ID || 'N/A'}`);
        } catch (error) {
          console.error(`   ⚠️  Ошибка получения лида ${leadId}:`, error.message);
        }
      }
    } else {
      console.log(`\n❌ Лиды с номером ${phone} не найдены`);
    }
    
    return results;
  } catch (error) {
    console.error(`\n❌ Ошибка поиска:`, error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    throw error;
  }
}

async function testSearchByEmail(email, entityTypes = ['lead']) {
  try {
    console.log(`📧 Поиск по email: ${email}`);
    console.log(`   Типы сущностей: ${entityTypes.join(', ')}\n`);
    
    const client = new Bitrix24Client(BITRIX24_WEBHOOK_URL);
    
    // Используем исправленный метод searchCRM
    const results = await client.searchCRM(email, entityTypes);
    
    console.log('📊 Результаты поиска:');
    console.log(JSON.stringify(results, null, 2));
    
    return results;
  } catch (error) {
    console.error(`\n❌ Ошибка поиска:`, error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    throw error;
  }
}

// Основная функция
async function main() {
  const phone = process.argv[2] || '+15551234567';
  const email = process.argv[3];
  
  try {
    // Тест поиска по телефону
    console.log('='.repeat(60));
    console.log('ТЕСТ 1: Поиск лидов по телефону');
    console.log('='.repeat(60));
    await testSearchByPhone(phone, ['lead']);
    
    if (email) {
      console.log('\n' + '='.repeat(60));
      console.log('ТЕСТ 2: Поиск лидов по email');
      console.log('='.repeat(60));
      await testSearchByEmail(email, ['lead']);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Все тесты завершены');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n❌ Тесты завершились с ошибкой:', error.message);
    process.exit(1);
  }
}

main();

