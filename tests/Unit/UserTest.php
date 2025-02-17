<?php

namespace Tests\Unit;

use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     */

    public function test_user_can_login()
    {
        $response = $this->post('/login', [
            'email' => 'rog@example.com',
            'password' => 'rog12345',
        ]);

        $response->assertStatus(302);
    }

    public function test_user_can_logout()
    {
        $response = $this->post('/logout');

        $response->assertStatus(302);
    }

    public function test_user_can_be_created()
    {
        $response = $this->post('/users', [
            'name' => 'Test User',
        ]);

        $response->assertStatus(302);
    }

    public function test_user_can_be_updated()
    {
        $response = $this->post('/users/1', [
            'name' => 'Updated User',
        ]);

        $response->assertStatus(302);
    }

    public function test_user_can_be_deleted()
    {
        $response = $this->delete('/users/1');

        $response->assertStatus(302);
    }
}
