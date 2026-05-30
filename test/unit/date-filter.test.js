/**
 * Unit tests for CRM date range filter normalization
 */

import { normalizeCrmDateFilter, buildDateCreateFilter } from '../../build/bitrix24/date-filter.js';

function runTests() {
  console.log('🧪 Running Unit Tests for date-filter...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      passed++;
      console.log(`  ✅ ${message}`);
    } else {
      failed++;
      console.log(`  ❌ ${message}`);
    }
  }

  const prevTz = process.env.BITRIX24_TIMEZONE_OFFSET;
  process.env.BITRIX24_TIMEZONE_OFFSET = '+03:00';

  assert(
    normalizeCrmDateFilter('2024-06-12', 'start') === '2024-06-12T00:00:00+03:00',
    'start date-only expands to day start'
  );
  assert(
    normalizeCrmDateFilter('2024-06-12', 'end') === '2024-06-12T23:59:59+03:00',
    'end date-only expands to day end'
  );
  assert(
    normalizeCrmDateFilter('2024-06-12T14:30:00+03:00', 'end') === '2024-06-12T14:30:00+03:00',
    'datetime with T is unchanged'
  );
  assert(
    normalizeCrmDateFilter(' 2024-06-12 ', 'start') === '2024-06-12T00:00:00+03:00',
    'trims whitespace on date-only'
  );

  const filter = buildDateCreateFilter('2024-06-12', '2024-06-12');
  assert(
    filter['>=DATE_CREATE'] === '2024-06-12T00:00:00+03:00' &&
      filter['<=DATE_CREATE'] === '2024-06-12T23:59:59+03:00',
    'buildDateCreateFilter same-day range'
  );

  const rangeOnlyStart = buildDateCreateFilter('2024-01-01');
  assert(
    rangeOnlyStart['>=DATE_CREATE'] === '2024-01-01T00:00:00+03:00' &&
      rangeOnlyStart['<=DATE_CREATE'] === undefined,
    'buildDateCreateFilter without endDate'
  );

  if (prevTz === undefined) {
    delete process.env.BITRIX24_TIMEZONE_OFFSET;
  } else {
    process.env.BITRIX24_TIMEZONE_OFFSET = prevTz;
  }

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
