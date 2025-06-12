<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

// Guest Routes

// Auth Routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/user', [AuthController::class, 'user'])->name('auth.user');
});

// User Routes
// `Route::group(['middleware' => 'auth', 'prefix' => 'user'], function () {
//     Route::get('/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
//     Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
//     Route::get('/orders', [UserController::class, 'orders'])->name('user.orders');
// });

// Admin Routes
Route::group(['middleware' => ['auth', 'admin'], 'prefix' => 'admin'], function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::resource('products', AdminController::class);
    Route::resource('categories', AdminController::class);
    Route::resource('orders', AdminController::class);
});
