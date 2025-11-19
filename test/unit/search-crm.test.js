/**
 * Unit tests for bitrix24_search_crm functionality
 * Tests the logic for phone/email detection and entity type handling
 */

// Test phone/email detection regex
function isPhoneNumber(query) {
  return /^\+?[\d\s\-\(\)]+$/.test(query.trim());
}

// Test entity type conversion logic
function convertEntityTypes(entityTypes) {
  const entityTypeMap = {
    'lead': 'LEAD',
    'contact': 'CONTACT',
    'company': 'COMPANY'
  };
  
  const validTypes = entityTypes
    .filter(t => t !== 'deal')
    .map(t => entityTypeMap[t.toLowerCase()])
    .filter(Boolean);
  
  return validTypes;
}

// Test parameter building logic
function buildSearchParams(query, entityTypes, isPhone) {
  const validTypes = convertEntityTypes(entityTypes);
  
  const params = {
    type: isPhone ? 'PHONE' : 'EMAIL',
    values: [query]
  };
  
  // Only set entity_type if exactly one type is specified
  if (validTypes.length === 1) {
    params.entity_type = validTypes[0];
  }
  
  return params;
}

// Test suite
function runTests() {
  console.log('🧪 Running Unit Tests for bitrix24_search_crm...\n');
  
  let passed = 0;
  let failed = 0;
  
  function test(name, fn) {
    try {
      fn();
      console.log(`✅ ${name}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${name}`);
      console.log(`   Error: ${error.message}`);
      failed++;
    }
  }
  
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }
  
  function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
  }
  
  // Test 1: Phone number detection
  console.log('\n📱 Testing Phone Number Detection:');
  test('Should detect phone with + prefix', () => {
    assert(isPhoneNumber('+380971518745'), 'Should detect +380971518745 as phone');
  });
  
  test('Should detect phone without + prefix', () => {
    assert(isPhoneNumber('380971518745'), 'Should detect 380971518745 as phone');
  });
  
  test('Should detect phone with spaces', () => {
    assert(isPhoneNumber('+38 097 151 87 45'), 'Should detect phone with spaces');
  });
  
  test('Should detect phone with dashes', () => {
    assert(isPhoneNumber('+38-097-151-87-45'), 'Should detect phone with dashes');
  });
  
  test('Should detect phone with parentheses', () => {
    assert(isPhoneNumber('+38 (097) 151-87-45'), 'Should detect phone with parentheses');
  });
  
  test('Should NOT detect email as phone', () => {
    assert(!isPhoneNumber('test@email.com'), 'Should NOT detect email as phone');
  });
  
  test('Should NOT detect email with dots as phone', () => {
    assert(!isPhoneNumber('john.doe@company.com'), 'Should NOT detect email as phone');
  });
  
  test('Should handle empty string', () => {
    assert(!isPhoneNumber(''), 'Empty string should not be phone');
  });
  
  // Test 2: Entity type conversion
  console.log('\n🏷️  Testing Entity Type Conversion:');
  test('Should convert single lead type', () => {
    const result = convertEntityTypes(['lead']);
    assertEqual(result, ['LEAD'], 'Should convert lead to LEAD');
  });
  
  test('Should convert single contact type', () => {
    const result = convertEntityTypes(['contact']);
    assertEqual(result, ['CONTACT'], 'Should convert contact to CONTACT');
  });
  
  test('Should convert single company type', () => {
    const result = convertEntityTypes(['company']);
    assertEqual(result, ['COMPANY'], 'Should convert company to COMPANY');
  });
  
  test('Should filter out deal type', () => {
    const result = convertEntityTypes(['deal']);
    assertEqual(result, [], 'Should filter out deal');
  });
  
  test('Should filter out deal from multiple types', () => {
    const result = convertEntityTypes(['lead', 'deal', 'contact']);
    assertEqual(result, ['LEAD', 'CONTACT'], 'Should filter out deal');
  });
  
  test('Should handle multiple types', () => {
    const result = convertEntityTypes(['lead', 'contact', 'company']);
    assertEqual(result, ['LEAD', 'CONTACT', 'COMPANY'], 'Should handle multiple types');
  });
  
  test('Should handle empty array', () => {
    const result = convertEntityTypes([]);
    assertEqual(result, [], 'Should handle empty array');
  });
  
  test('Should handle case insensitive types', () => {
    const result = convertEntityTypes(['LEAD', 'Contact', 'COMPANY']);
    assertEqual(result, ['LEAD', 'CONTACT', 'COMPANY'], 'Should handle case insensitive');
  });
  
  test('Should filter out invalid types', () => {
    const result = convertEntityTypes(['lead', 'invalid', 'contact']);
    assertEqual(result, ['LEAD', 'CONTACT'], 'Should filter out invalid types');
  });
  
  // Test 3: Parameter building
  console.log('\n⚙️  Testing Parameter Building:');
  test('Should build phone search params with single entity type', () => {
    const params = buildSearchParams('+380971518745', ['lead'], true);
    assertEqual(params, {
      type: 'PHONE',
      values: ['+380971518745'],
      entity_type: 'LEAD'
    }, 'Should include entity_type for single type');
  });
  
  test('Should build email search params with single entity type', () => {
    const params = buildSearchParams('test@example.com', ['contact'], false);
    assertEqual(params, {
      type: 'EMAIL',
      values: ['test@example.com'],
      entity_type: 'CONTACT'
    }, 'Should include entity_type for single type');
  });
  
  test('Should build params without entity_type for multiple types', () => {
    const params = buildSearchParams('test@example.com', ['lead', 'contact'], false);
    assertEqual(params, {
      type: 'EMAIL',
      values: ['test@example.com']
    }, 'Should NOT include entity_type for multiple types');
  });
  
  test('Should build params with entity_type when deal is included but one valid type remains', () => {
    const params = buildSearchParams('+380971518745', ['lead', 'deal'], true);
    // When deal is filtered out, only 'lead' remains, so entity_type should be set
    assertEqual(params, {
      type: 'PHONE',
      values: ['+380971518745'],
      entity_type: 'LEAD'
    }, 'Should include entity_type when only one valid type remains after filtering deal');
  });
  
  test('Should build params without entity_type when deal is included with multiple valid types', () => {
    const params = buildSearchParams('+380971518745', ['lead', 'deal', 'contact'], true);
    assertEqual(params, {
      type: 'PHONE',
      values: ['+380971518745']
    }, 'Should NOT include entity_type when multiple valid types remain after filtering deal');
  });
  
  test('Should build params without entity_type for empty types', () => {
    const params = buildSearchParams('test@example.com', [], false);
    assertEqual(params, {
      type: 'EMAIL',
      values: ['test@example.com']
    }, 'Should NOT include entity_type for empty types');
  });
  
  test('Should build params without entity_type when only deal is specified', () => {
    const params = buildSearchParams('+380971518745', ['deal'], true);
    assertEqual(params, {
      type: 'PHONE',
      values: ['+380971518745']
    }, 'Should NOT include entity_type when only deal is specified');
  });
  
  // Test 4: Integration scenarios
  console.log('\n🔗 Testing Integration Scenarios:');
  test('Should handle phone search for leads only', () => {
    const isPhone = isPhoneNumber('+380971518745');
    const params = buildSearchParams('+380971518745', ['lead'], isPhone);
    assert(params.type === 'PHONE', 'Should use PHONE type');
    assert(params.entity_type === 'LEAD', 'Should filter to LEAD only');
  });
  
  test('Should handle email search across all types', () => {
    const isPhone = isPhoneNumber('test@example.com');
    const params = buildSearchParams('test@example.com', ['contact', 'lead', 'company'], isPhone);
    assert(params.type === 'EMAIL', 'Should use EMAIL type');
    assert(params.entity_type === undefined, 'Should search all types');
  });
  
  test('Should handle phone search with deal in list', () => {
    const isPhone = isPhoneNumber('+380971518745');
    const params = buildSearchParams('+380971518745', ['lead', 'deal', 'contact'], isPhone);
    assert(params.type === 'PHONE', 'Should use PHONE type');
    assert(params.entity_type === undefined, 'Should search all types when deal is included');
  });
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 All unit tests passed!');
    return 0;
  } else {
    console.log('\n⚠️  Some tests failed');
    return 1;
  }
}

// Run tests if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const exitCode = runTests();
  process.exit(exitCode);
}

export { runTests, isPhoneNumber, convertEntityTypes, buildSearchParams };

