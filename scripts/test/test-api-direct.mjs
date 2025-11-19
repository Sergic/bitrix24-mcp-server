#!/usr/bin/env node

/**
 * Прямой тест API Bitrix24 с правильными параметрами TYPE, VALUES, ENTITY_TYPE
 * Проверяет, что API принимает запрос в правильном формате
 */

import { config } from 'dotenv';

config();

const BITRIX24_WEBHOOK_URL = process.env.BITRIX24_WEBHOOK_URL || 
  'https://sviluppofranchising.bitrix24.it/rest/27/wwugdez6m774803q/';

async function testDirectAPI(phone) {
  try {
    const baseUrl = BITRIX24_WEBHOOK_URL.replace(/\/$/, '');
    const url = `${baseUrl}/crm.duplicate.findbycomm`;
    
    // Правильный формат согласно документации Bitrix24:
    // TYPE, VALUES, ENTITY_TYPE (все в верхнем регистре)
    const body = new URLSearchParams();
    body.append('TYPE', 'PHONE');
    body.append('VALUES[0]', phone);
    body.append('ENTITY_TYPE', 'LEAD');
    
    console.log(`🔍 Поиск лидов с телефоном: ${phone}`);
    console.log(`📡 URL: ${url}`);
    console.log(`📦 Параметры запроса:`);
    console.log(`   TYPE: PHONE`);
    console.log(`   VALUES[0]: ${phone}`);
    console.log(`   ENTITY_TYPE: LEAD\n`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: body.toString(),
    });

    console.log(`📥 HTTP Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ HTTP Error: ${errorText}`);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error(`❌ Bitrix24 API Error:`, data.error);
      throw new Error(`Bitrix24 API Error: ${data.error.error} - ${data.error.error_description}`);
    }

    console.log('✅ Успешный ответ от API!');
    console.log('\n📊 Результаты поиска:');
    console.log(JSON.stringify(data.result, null, 2));
    
    // Извлекаем ID лидов
    const leadIds = data.result?.LEAD || [];
    
    if (leadIds.length === 0) {
      console.log(`\n⚠️  Лиды с номером ${phone} не найдены`);
      return [];
    }
    
    console.log(`\n✅ Найдено ${leadIds.length} лид(ов) с телефоном ${phone}`);
    return leadIds;
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    throw error;
  }
}

const phone = process.argv[2] || '+15551234567';
console.log('\n' + '='.repeat(60));
console.log('ТЕСТ: Прямой вызов Bitrix24 API');
console.log('='.repeat(60) + '\n');

testDirectAPI(phone)
  .then(leadIds => {
    console.log(`\n✅ Тест завершен. Найдено лидов: ${leadIds.length}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Тест провален:', error.message);
    process.exit(1);
  });

