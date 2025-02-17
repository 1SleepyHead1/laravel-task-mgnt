<?php

namespace Tests\Unit;

use Tests\TestCase;

class TaskTest extends TestCase
{
    /**
     * A basic unit test example.
     */

    public function test_tasks_can_be_viewed()
    {
        $response = $this->get('/tasks');

        $response->assertStatus(302);
    }

    public function test_task_can_be_created()
    {
        $response = $this->post('/tasks', [
            'name' => 'Test Task',
        ]);

        $response->assertStatus(302);
    }

    public function test_task_can_be_updated()
    {
        $response = $this->post('/tasks/1', [
            'name' => 'Updated Task',
        ]);

        $response->assertStatus(302);
    }

    public function test_task_can_be_deleted()
    {
        $response = $this->delete('/tasks/1');

        $response->assertStatus(302);
    }
}
