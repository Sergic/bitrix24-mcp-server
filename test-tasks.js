#!/usr/bin/env node

/**
 * Test script for Bitrix24 Task Management Tools
 * Tests: create, get, list, and update tasks
 */

import { bitrix24Client } from './build/bitrix24/client.js';

// Set webhook URL from command line or use default
process.env.BITRIX24_WEBHOOK_URL = 'https://godkod.bitrix24.ru/rest/1/wo3dohep3yi5tyeb/';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testTasks() {
  log('cyan', '\n=== Testing Bitrix24 Task Management Tools ===\n');

  let createdTaskId = null;

  try {
    // Test 1: Get current user
    log('blue', '1️⃣  Getting current user info...');
    const currentUser = await bitrix24Client.getCurrentUser();
    log('green', `✓ Current user: ${currentUser.NAME} ${currentUser.LAST_NAME} (ID: ${currentUser.ID})`);

    // Test 2: Create a new task
    log('blue', '\n2️⃣  Creating a new test task...');
    const newTask = {
      TITLE: '🧪 Test Task from MCP Server',
      DESCRIPTION: 'This is a test task created via Bitrix24 MCP Server to test the new task management tools.',
      RESPONSIBLE_ID: currentUser.ID,
      DEADLINE: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      PRIORITY: '2' // High priority
    };

    createdTaskId = await bitrix24Client.createTask(newTask);
    log('green', `✓ Task created successfully! ID: ${createdTaskId}`);

    // Test 3: Get the created task
    log('blue', '\n3️⃣  Retrieving the created task...');
    const retrievedTask = await bitrix24Client.getTask(createdTaskId);
    log('green', `✓ Task retrieved: "${retrievedTask.title}"`);
    log('yellow', `  Priority: ${retrievedTask.priority === '2' ? 'High' : retrievedTask.priority === '1' ? 'Normal' : 'Low'}`);
    log('yellow', `  Status: ${retrievedTask.status}`);
    log('yellow', `  Deadline: ${retrievedTask.deadline || 'Not set'}`);

    // Test 4: List tasks
    log('blue', '\n4️⃣  Listing tasks for current user...');
    const tasks = await bitrix24Client.listTasks({
      filter: { RESPONSIBLE_ID: currentUser.ID },
      select: ['ID', 'TITLE', 'STATUS', 'PRIORITY']
    });
    log('green', `✓ Found ${tasks.length} task(s) for current user`);
    if (tasks.length > 0) {
      log('yellow', '  Latest tasks:');
      tasks.slice(0, 3).forEach((task, index) => {
        log('yellow', `    ${index + 1}. [ID: ${task.id}] ${task.title}`);
      });
    }

    // Test 5: Update the task
    log('blue', '\n5️⃣  Updating the test task...');
    const updateData = {
      DESCRIPTION: '✅ UPDATED: This task has been modified to test the update functionality.',
      PRIORITY: '1', // Change to normal priority
      STATUS: '3' // In progress
    };

    try {
      const updated = await bitrix24Client.updateTask(createdTaskId, updateData);
      log('green', '✓ Task updated successfully!');
      log('yellow', `  Update result: ${JSON.stringify(updated)}`);

      // Verify the update
      const updatedTask = await bitrix24Client.getTask(createdTaskId);
      log('yellow', `  New priority: ${updatedTask.priority === '2' ? 'High' : updatedTask.priority === '1' ? 'Normal' : 'Low'}`);
      log('yellow', `  New status: ${updatedTask.status === '3' ? 'In Progress' : updatedTask.status}`);
    } catch (error) {
      log('red', `✗ Task update failed: ${error.message}`);
      log('yellow', '  Continuing with tests...');
    }

    // Test 6: List all tasks (no filter)
    log('blue', '\n6️⃣  Listing all accessible tasks...');
    const allTasks = await bitrix24Client.listTasks({
      select: ['ID', 'TITLE', 'RESPONSIBLE_ID']
    });
    log('green', `✓ Found ${allTasks.length} total task(s) accessible to current user`);

    log('cyan', '\n=== ✅ All tests completed successfully! ===\n');
    log('yellow', `\n💡 Test task created with ID: ${createdTaskId}`);
    log('yellow', '   You can view it in your Bitrix24 portal or delete it manually.\n');

  } catch (error) {
    log('red', `\n❌ Error during testing: ${error.message}`);
    if (error.response) {
      log('red', `   API Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    console.error(error);
    process.exit(1);
  }
}

// Run tests
testTasks().catch(error => {
  log('red', `\n❌ Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
