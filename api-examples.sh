#!/bin/bash

# Bitrix24 REST API для n8n - Примеры запросов
# Перед использованием запустите: npm run start:n8n

API_URL="http://localhost:3001"

echo "🚀 Bitrix24 REST API - Примеры запросов"
echo "=========================================="

# Health check
echo -e "\n📍 1. Health Check"
curl -s "$API_URL/health" | jq

# Validate webhook
echo -e "\n📍 2. Validate Webhook"
curl -s "$API_URL/validate" | jq

# Get current user
echo -e "\n📍 3. Получить текущего пользователя"
curl -s "$API_URL/users/current" | jq

# Create contact
echo -e "\n📍 4. Создать контакт"
curl -s -X POST "$API_URL/contacts" \
  -H "Content-Type: application/json" \
  -d '{
    "NAME": "Тестовый",
    "LAST_NAME": "Контакт",
    "EMAIL": [{"VALUE": "test@example.com", "VALUE_TYPE": "WORK"}],
    "PHONE": [{"VALUE": "+7 999 123 4567", "VALUE_TYPE": "MOBILE"}],
    "COMMENTS": "Создан через REST API"
  }' | jq

# Get contacts
echo -e "\n📍 5. Получить список контактов (первые 5)"
curl -s "$API_URL/contacts?start=0" | jq '.data[0:5]'

# Create deal
echo -e "\n📍 6. Создать сделку"
CONTACT_ID=$(curl -s "$API_URL/contacts?start=0" | jq -r '.data[0].ID')
curl -s -X POST "$API_URL/deals" \
  -H "Content-Type: application/json" \
  -d "{
    \"TITLE\": \"Тестовая сделка из API\",
    \"OPPORTUNITY\": \"100000\",
    \"CURRENCY_ID\": \"RUB\",
    \"CONTACT_ID\": \"$CONTACT_ID\",
    \"COMMENTS\": \"Создана через REST API\"
  }" | jq

# Get latest leads
echo -e "\n📍 7. Получить последние 5 лидов"
curl -s "$API_URL/leads/latest?limit=5" | jq

# Get users
echo -e "\n📍 8. Получить список пользователей"
curl -s "$API_URL/users" | jq '.data[] | {ID, NAME, LAST_NAME, EMAIL}'

# User performance analytics
echo -e "\n📍 9. Аналитика производительности пользователя"
USER_ID=$(curl -s "$API_URL/users/current" | jq -r '.data.ID')
START_DATE="2024-01-01"
END_DATE=$(date +%Y-%m-%d)
curl -s "$API_URL/analytics/user-performance?userId=$USER_ID&startDate=$START_DATE&endDate=$END_DATE" | jq

# Create task
echo -e "\n📍 10. Создать задачу"
curl -s -X POST "$API_URL/tasks" \
  -H "Content-Type: application/json" \
  -d "{
    \"TITLE\": \"Тестовая задача из API\",
    \"DESCRIPTION\": \"Описание задачи\",
    \"RESPONSIBLE_ID\": \"$USER_ID\",
    \"PRIORITY\": \"1\",
    \"DEADLINE\": \"2024-12-31\"
  }" | jq

echo -e "\n✅ Все примеры выполнены!"
echo "📚 Полная документация: N8N_INTEGRATION.md"
