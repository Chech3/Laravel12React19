<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $password = 'md5'.md5('password');
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => $password,
        ]);
    }
}
