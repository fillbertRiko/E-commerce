<?php

use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\HomeController;

// Public routes
Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/register', [AuthenticationController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::get('/user', [AuthenticationController::class, 'user']);

    // User routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UsersController::class, 'index']);
        Route::get('/profile', [UsersController::class, 'profile']);
        Route::post('/profile', [UsersController::class, 'updateProfile']);
        Route::post('/change-password', [UsersController::class, 'changePassword']);
    });
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [UsersController::class, 'index'])->name('users.index');
    Route::get('/user/profile', [UsersController::class, 'profile'])->name('user.profile');
    Route::get('/user/edit-profile', [UsersController::class, 'editProfile'])->name('user.editProfile');
    Route::post('/user/update-profile', [UsersController::class, 'updateProfile'])->name('user.updateProfile');
    Route::get('/user/change-password', [UsersController::class, 'changePassword'])->name('user.changePassword');
    Route::post('/user/update-password', [UsersController::class, 'updatePassword'])->name('user.updatePassword');
});


// Thêm route OPTIONS để xử lý preflight requests
Route::options('/{any}', function () {
    return response()->json();
})->where('any', '.*');

// Các API routes của bạn
Route::middleware('cors')->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'CORS working!']);
    });

    // Thêm các route API khác của bạn ở đây
});
Route::get('/', [HomeController::class, 'index'])->name('home');
