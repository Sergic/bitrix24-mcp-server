# 🚀 Настройка Bitrix24 MCP Server для n8n

## Обзор

Этот гайд покажет, как подключить ваш Bitrix24 MCP Server к n8n для создания мощных автоматизаций CRM.

## 📋 Содержание

1. [Подготовка сервера](#подготовка-сервера)
2. [Способы подключения к n8n](#способы-подключения-к-n8n)
3. [Настройка в n8n](#настройка-в-n8n)
4. [Примеры workflow](#примеры-workflow)
5. [Troubleshooting](#troubleshooting)

---

## Подготовка сервера

### 1. Запуск локально (для тестирования)

```bash
cd /path/to/bitrix24-mcp-server
npm install
npm run build
npm run start:http
```

Сервер запустится на `http://localhost:3000`

### 2. Запуск в production

#### Вариант A: PM2 (рекомендуется)

```bash
npm install -g pm2
pm2 start http-streamable-server.js --name bitrix24-mcp
pm2 startup  # Автозапуск при перезагрузке
pm2 save
```

#### Вариант B: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "http-streamable-server.js"]
```

Запуск:
```bash
docker build -t bitrix24-mcp .
docker run -d -p 3000:3000 --env-file .env bitrix24-mcp
```

#### Вариант C: Cloudflare Workers / Vercel

Для serverless развертывания с scale-to-zero возможностями.

### 3. Проверка работы

```bash
# Проверка здоровья сервера
curl http://localhost:3000/health

# Список доступных инструментов
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

---

## Способы подключения к n8n

### 🎯 Способ 1: MCP Client Tool (Рекомендуется)

**Преимущества:**
- ✅ Полная MCP совместимость
- ✅ Автоматическое обнаружение инструментов
- ✅ Нативная интеграция с AI агентами
- ✅ Динамическое обновление списка tools

**Требования:**
- n8n версии 1.70.0+
- Переменная окружения: `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`

#### Установка community node (опционально)

Если встроенный MCP Client Tool недоступен:

```bash
# В n8n Settings → Community Nodes
npm install n8n-nodes-mcp-client
```

### 🔧 Способ 2: HTTP Request Node (Универсальный)

**Преимущества:**
- ✅ Работает во всех версиях n8n
- ✅ Простая настройка
- ✅ Полный контроль над запросами
- ✅ Подходит для простых сценариев

---

## Настройка в n8n

### Способ 1: MCP Client Tool Node

#### Шаг 1: Добавьте AI Agent node

1. Создайте новый workflow
2. Добавьте node: **AI Agent** (OpenAI / Anthropic / etc.)
3. Настройте модель и параметры

#### Шаг 2: Добавьте MCP Client Tool

1. Нажмите **Add Tool** в AI Agent
2. Выберите **MCP Client Tool**
3. Настройте параметры:

**Для встроенного MCP Client Tool:**
```
SSE Endpoint: http://localhost:3000/mcp
или
HTTP Streamable URL: http://localhost:3000/mcp (предпочтительно)

Authentication: None (или настройте Bearer Token)

Tools to Include:
- All (все 50+ инструментов)
- Selected (выберите нужные)
- All Except (исключите ненужные)
```

**Для community node (n8n-nodes-mcp-client):**
```
Transport Type: HTTP Streamable
URL: http://localhost:3000/mcp
Authentication: None
```

#### Шаг 3: Проверьте подключение

MCP Client Tool автоматически получит список всех доступных инструментов:
- `bitrix24_create_contact`
- `bitrix24_get_latest_deals`
- `bitrix24_monitor_user_activities`
- И еще 47 инструментов!

#### Пример конфигурации workflow:

```
[Manual Trigger] → [AI Agent + MCP Client Tool] → [Output]
                         ↓
                   (автоматически использует
                    Bitrix24 инструменты)
```

#### Пример запроса к AI Agent:

```
Промпт: "Создай контакт с именем Иван Петров,
email ivan@example.com и телефоном +7 999 123 4567"
```

AI Agent автоматически:
1. Выберет инструмент `bitrix24_create_contact`
2. Сформирует правильные параметры
3. Выполнит запрос
4. Вернет результат

---

### Способ 2: HTTP Request Node

Для более точного контроля используйте прямые HTTP запросы.

#### Пример 1: Получить список контактов

```
Node: HTTP Request
Method: POST
URL: http://localhost:3000/mcp

Headers:
  Content-Type: application/json
  Accept: application/json

Body (JSON):
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "bitrix24_get_latest_contacts",
    "arguments": {
      "limit": 10
    }
  }
}
```

#### Пример 2: Создать контакт

```
Node: HTTP Request
Method: POST
URL: http://localhost:3000/mcp

Body (JSON):
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "bitrix24_create_contact",
    "arguments": {
      "fields": {
        "NAME": "Иван",
        "LAST_NAME": "Петров",
        "EMAIL": [{"VALUE": "ivan@example.com", "VALUE_TYPE": "WORK"}],
        "PHONE": [{"VALUE": "+7 999 123 4567", "VALUE_TYPE": "MOBILE"}]
      }
    }
  }
}
```

#### Пример 3: Получить аналитику пользователя

```
Node: HTTP Request
Method: POST
URL: http://localhost:3000/mcp

Body (JSON):
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "bitrix24_get_user_performance_summary",
    "arguments": {
      "userId": "1",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
  }
}
```

---

## Примеры Workflow

### 📊 Workflow 1: Ежедневный отчет по продажам

**Описание:** Каждое утро AI анализирует вчерашние продажи и отправляет отчет.

**Nodes:**
1. **Schedule Trigger** - каждый день в 9:00
2. **AI Agent + MCP Client Tool** - анализ данных
3. **Email / Slack** - отправка отчета

**AI Промпт:**
```
Проанализируй вчерашние продажи:
1. Получи все сделки за вчера
2. Подсчитай общую сумму
3. Найди топ-3 менеджеров
4. Определи проблемные сделки (застрявшие в одном статусе >7 дней)
5. Сформируй краткий отчет
```

**AI автоматически использует:**
- `bitrix24_get_deals_from_date_range`
- `bitrix24_get_deals_with_user_names`
- `bitrix24_track_deal_progression`
- `bitrix24_compare_user_performance`

---

### 🎯 Workflow 2: Автоматическое создание лидов из формы

**Описание:** Webhook получает данные формы, AI обогащает и создает лид.

**Nodes:**
1. **Webhook Trigger** - получение данных формы
2. **AI Agent + MCP Client Tool** - обработка и создание
3. **Conditional** - роутинг по типу запроса
4. **Notification** - уведомление менеджера

**AI Промпт:**
```
Обработай новый запрос с формы:
1. Создай лид с данными: {{ $json.name }}, {{ $json.email }}, {{ $json.phone }}
2. Определи приоритет по ключевым словам в сообщении
3. Назначь ответственного менеджера по региону
4. Верни ID созданного лида
```

**AI автоматически использует:**
- `bitrix24_create_lead`
- `bitrix24_get_all_users` (для выбора менеджера)

---

### 🔄 Workflow 3: Синхронизация с Google Sheets

**Описание:** Экспорт всех контактов в Google Sheets каждый час.

**Nodes:**
1. **Schedule Trigger** - каждый час
2. **HTTP Request** - получить контакты через MCP
3. **Function** - форматирование данных
4. **Google Sheets** - запись данных

**HTTP Request конфигурация:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "bitrix24_list_contacts",
    "arguments": {
      "start": 0,
      "limit": 50
    }
  }
}
```

**Function Node (JavaScript):**
```javascript
// Парсим ответ MCP
const mcpResponse = JSON.parse($input.item.json.result.content[0].text);
const contacts = mcpResponse.contacts || [];

// Форматируем для Google Sheets
return contacts.map(contact => ({
  name: `${contact.NAME || ''} ${contact.LAST_NAME || ''}`.trim(),
  email: contact.EMAIL?.[0]?.VALUE || '',
  phone: contact.PHONE?.[0]?.VALUE || '',
  company: contact.COMPANY_TITLE || '',
  created: contact.DATE_CREATE
}));
```

---

### 🤖 Workflow 4: AI Sales Assistant

**Описание:** Чат-бот для менеджеров с доступом к CRM.

**Nodes:**
1. **Webhook Trigger** - webhook от Telegram/Slack
2. **AI Agent + MCP Client Tool** - обработка запроса
3. **Telegram/Slack** - отправка ответа

**Примеры запросов:**
```
Менеджер: "Сколько у меня активных сделок?"
AI: использует bitrix24_list_deals с фильтром по USER_ID

Менеджер: "Покажи контакты созданные сегодня"
AI: использует bitrix24_get_latest_contacts

Менеджер: "Создай задачу: позвонить Иванову завтра"
AI: создает задачу через bitrix24_create_task (если добавлен)
```

---

### 📈 Workflow 5: Мониторинг команды продаж

**Описание:** Real-time dashboard обновление каждые 5 минут.

**Nodes:**
1. **Schedule Trigger** - каждые 5 минут
2. **AI Agent + MCP Client Tool** - сбор метрик
3. **Function** - агрегация данных
4. **HTTP Request** - обновление dashboard

**AI Промпт:**
```
Собери метрики команды за сегодня:
1. Активность каждого менеджера
2. Прогресс по сделкам
3. Конверсия лидов
4. Прогноз выполнения плана
```

**AI автоматически использует:**
- `bitrix24_monitor_sales_activities`
- `bitrix24_get_team_dashboard`
- `bitrix24_forecast_performance`

---

## Доступные Инструменты (50+)

### 📇 Контакты (6 инструментов)
- `bitrix24_create_contact` - создание контакта
- `bitrix24_get_contact` - получение по ID
- `bitrix24_list_contacts` - список контактов
- `bitrix24_get_latest_contacts` - последние контакты
- `bitrix24_update_contact` - обновление
- `bitrix24_get_contacts_with_user_names` - с именами ответственных

### 💼 Сделки (12 инструментов)
- `bitrix24_create_deal` - создание сделки
- `bitrix24_get_deal` - получение по ID
- `bitrix24_list_deals` - список сделок
- `bitrix24_get_latest_deals` - последние сделки
- `bitrix24_get_deals_from_date_range` - по периоду
- `bitrix24_update_deal` - обновление
- `bitrix24_get_deals_with_user_names` - с именами
- `bitrix24_get_deal_pipelines` - воронки
- `bitrix24_get_deal_stages` - стадии
- `bitrix24_filter_deals_by_pipeline` - фильтр по воронке
- `bitrix24_filter_deals_by_budget` - фильтр по бюджету
- `bitrix24_filter_deals_by_status` - фильтр по статусу

### 🎯 Лиды (7 инструментов)
- `bitrix24_create_lead` - создание лида
- `bitrix24_get_lead` - получение по ID
- `bitrix24_list_leads` - список лидов
- `bitrix24_get_latest_leads` - последние лиды
- `bitrix24_get_leads_from_date_range` - по периоду
- `bitrix24_update_lead` - обновление
- `bitrix24_get_leads_with_user_names` - с именами

### 🏢 Компании (7 инструментов)
- `bitrix24_create_company` - создание компании
- `bitrix24_get_company` - получение по ID
- `bitrix24_list_companies` - список компаний
- `bitrix24_update_company` - обновление
- `bitrix24_get_latest_companies` - последние компании
- `bitrix24_get_companies_from_date_range` - по периоду
- `bitrix24_get_companies_with_user_names` - с именами

### 📊 Мониторинг продаж (10 инструментов)
- `bitrix24_monitor_user_activities` - активность пользователя
- `bitrix24_get_user_performance_summary` - производительность
- `bitrix24_analyze_account_performance` - анализ аккаунта
- `bitrix24_compare_user_performance` - сравнение пользователей
- `bitrix24_track_deal_progression` - прогресс сделок
- `bitrix24_monitor_sales_activities` - активность продаж
- `bitrix24_generate_sales_report` - отчет по продажам
- `bitrix24_get_team_dashboard` - дашборд команды
- `bitrix24_analyze_customer_engagement` - вовлеченность клиентов
- `bitrix24_forecast_performance` - прогноз производительности

### 👥 Пользователи (3 инструмента)
- `bitrix24_get_user` - получить пользователя
- `bitrix24_get_all_users` - все пользователи
- `bitrix24_resolve_user_names` - преобразовать ID в имена

### 🔧 Утилиты (5 инструментов)
- `bitrix24_search_crm` - поиск по CRM
- `bitrix24_validate_webhook` - проверка webhook
- `bitrix24_diagnose_permissions` - диагностика прав
- `bitrix24_check_crm_settings` - настройки CRM
- `bitrix24_test_leads_api` - тест API лидов

---

## Настройка аутентификации

### Для production развертывания

#### 1. Bearer Token в MCP сервере

Добавьте в `http-streamable-server.js`:

```javascript
// После строки 115
const authToken = process.env.MCP_AUTH_TOKEN;

if (req.method === 'POST' && req.url === MCP_ENDPOINT) {
  // Проверка токена
  const authHeader = req.headers['authorization'];
  if (authToken && authHeader !== `Bearer ${authToken}`) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return;
  }
  // ... остальной код
}
```

#### 2. Настройка в n8n

**Для MCP Client Tool:**
```
Authentication: Bearer Token
Token: ваш-секретный-токен
```

**Для HTTP Request:**
```
Authentication: Generic Credential Type
Credential Type: Header Auth

Name: Authorization
Value: Bearer ваш-секретный-токен
```

---

## Мультитенантность (несколько Bitrix24 аккаунтов)

### Вариант 1: Webhook в заголовке

Модифицируйте `http-streamable-server.js`:

```javascript
// В executeToolCall передавайте webhook из заголовка
const bitrixWebhook = req.headers['x-bitrix-webhook'];

// Используйте bitrixWebhook вместо process.env.BITRIX24_WEBHOOK_URL
```

**В n8n:**
```
Headers:
  X-Bitrix-Webhook: https://ваш-домен.bitrix24.ru/rest/123/abc...
```

### Вариант 2: Отдельные MCP серверы

Запустите несколько инстансов на разных портах:

```bash
PORT=3001 BITRIX24_WEBHOOK_URL=webhook1 node http-streamable-server.js
PORT=3002 BITRIX24_WEBHOOK_URL=webhook2 node http-streamable-server.js
PORT=3003 BITRIX24_WEBHOOK_URL=webhook3 node http-streamable-server.js
```

---

## Troubleshooting

### Проблема 1: MCP Client Tool не находит инструменты

**Решение:**
```bash
# Проверьте, что сервер отвечает
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Убедитесь, что N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

### Проблема 2: Connection refused

**Решение:**
```bash
# Проверьте, запущен ли сервер
curl http://localhost:3000/health

# Проверьте правильность URL в n8n
# Должно быть: http://localhost:3000/mcp (не /mcp/)
```

### Проблема 3: 401 Unauthorized от Bitrix24

**Решение:**
```bash
# Проверьте webhook
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"tools/call",
    "params":{"name":"bitrix24_validate_webhook"}
  }'

# Проверьте .env файл
cat .env | grep BITRIX24_WEBHOOK_URL
```

### Проблема 4: Медленные ответы

**Причина:** Bitrix24 имеет rate limit 2 запроса/секунду

**Решение:**
- Используйте batch запросы где возможно
- Кэшируйте данные пользователей
- Добавьте очередь запросов

### Проблема 5: AI Agent не использует инструменты

**Решение:**
```
1. Сделайте промпт более конкретным:
   ❌ "Покажи сделки"
   ✅ "Используй инструмент bitrix24_list_deals чтобы получить все сделки"

2. Проверьте, что AI Agent правильно настроен:
   - Model: выбрана модель с function calling
   - Temperature: не слишком высокая (0.3-0.7)
   - Tools: MCP Client Tool подключен
```

---

## Мониторинг и логи

### 1. Логи MCP сервера

```bash
# Если запущен через PM2
pm2 logs bitrix24-mcp

# Если запущен напрямую - логи в stderr:
# 📨 Received JSON-RPC request: {...}
# 📤 Sending response: {...}
```

### 2. Метрики в n8n

Включите execution logging в n8n:
```
Settings → Log → Execution log level: Extended
```

### 3. Health check endpoint

```bash
# Проверка здоровья
curl http://localhost:3000/health

# Ответ:
{
  "status": "healthy",
  "timestamp": "2025-10-13T12:00:00.000Z",
  "version": "1.0.0",
  "uptime": 123456,
  "protocol": "MCP HTTP Streamable (2025-03-26)",
  "endpoint": "/mcp",
  "tools": 50
}
```

---

## Production Checklist

- [ ] Сервер запущен через PM2 или Docker
- [ ] Настроен reverse proxy (nginx/caddy)
- [ ] SSL сертификат установлен (Let's Encrypt)
- [ ] Включена аутентификация (Bearer Token)
- [ ] CORS настроен на конкретные домены
- [ ] Логирование настроено
- [ ] Health check endpoint мониторится
- [ ] Rate limiting добавлен (optional)
- [ ] Backup стратегия для .env файлов
- [ ] Алерты на ошибки настроены

---

## Дополнительные ресурсы

- [MCP Specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports)
- [n8n Documentation](https://docs.n8n.io)
- [Bitrix24 API](https://dev.bitrix24.com/)
- [HTTP Streamable Guide](./HTTP_STREAMABLE_GUIDE.md)
- [Quick Start для n8n](./QUICK_START_N8N.md)

---

## Поддержка

Если возникли вопросы:

1. Проверьте раздел [Troubleshooting](#troubleshooting)
2. Запустите диагностические инструменты:
   - `bitrix24_validate_webhook`
   - `bitrix24_diagnose_permissions`
3. Проверьте логи сервера
4. Откройте issue на GitHub

---

**Готово!** 🎉

Теперь вы можете создавать мощные автоматизации Bitrix24 через n8n с поддержкой AI!
