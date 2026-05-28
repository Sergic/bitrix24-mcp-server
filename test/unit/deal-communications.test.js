/**
 * Unit tests for deal communications (same helpers as lead)
 */

import { summarizeActivitiesByTypeId } from '../../build/bitrix24/client.js';

function runTests() {
  console.log('🧪 Running Unit Tests for deal communications helpers...\n');

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
    { TYPE_ID: '6' },
    { TYPE_ID: 4 },
  ]);

  assert(summary['6'] === 1, 'TODO TYPE_ID 6');
  assert(summary['4'] === 1, 'email TYPE_ID 4');

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
