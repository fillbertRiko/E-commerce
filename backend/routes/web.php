<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Middleware\Authenticate;
use App\Http\Controllers\HomeController;

// Route::get('/', function () {
//     return response()->json(['message' => 'Welcome to the API!']);
// });
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
