<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // SuperAdmin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'role_id' => 1, // ID của superadmin
            'email_verified_at' => now()
        ]);

        // Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => 2, // ID của admin
            'email_verified_at' => now()
        ]);

        // Regular User
        User::create([
            'name' => 'Người Dùng',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => 3, // ID của user
            'email_verified_at' => now()
        ]);

        // Tạo thêm 5 người dùng thông thường
        \App\Models\User::factory(5)->create([
            'role_id' => 3
        ]);
    }
}
