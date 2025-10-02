<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/login', [UserController::class, 'login']);
// Routes API - exemption CSRF
Route::prefix('api')->withoutMiddleware(['web'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
});