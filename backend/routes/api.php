<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);

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
