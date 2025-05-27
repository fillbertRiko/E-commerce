<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'name' => 'superadmin',
                'description' => 'Quản trị hệ thống cao cấp với toàn quyền'
            ],
            [
                'name' => 'admin',
                'description' => 'Quản trị hệ thống với quyền hạn nhất định'
            ],
            [
                'name' => 'user',
                'description' => 'Người dùng thông thường'
            ]
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
