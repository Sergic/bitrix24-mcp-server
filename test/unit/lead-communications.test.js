/**
 * Unit tests for lead communications helpers
 */

import { summarizeActivitiesByTypeId } from '../../build/bitrix24/client.js';

function runTests() {
  console.log('🧪 Running Unit Tests for lead communications...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ ${message}`);
      passed++;
    } else {
      console.log(`  ❌ ${message}`);
      failed++;
    }
  }

  const summary = summarizeActivitiesByTypeId([
    { TYPE_ID: '2' },
    { TYPE_ID: 2 },
    { TYPE_ID: '4' },
    { TYPE_ID: null },
  ]);

  assert(summary['2'] === 2, 'groups call TYPE_ID 2');
  assert(summary['4'] === 1, 'counts email TYPE_ID 4');
  assert(summary['unknown'] === 1, 'missing TYPE_ID → unknown');

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
