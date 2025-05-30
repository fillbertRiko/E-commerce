<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\HomeController;

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    Route::post('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);
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
