<?php

use App\Http\Controllers\Api\PrayerTimeController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes pour les horaires de prière
Route::prefix('prayer-times')->group(function () {
    Route::get('/today', [PrayerTimeController::class, 'today']);
    Route::get('/weekly', [PrayerTimeController::class, 'weekly']);
    Route::get('/current', [PrayerTimeController::class, 'current']);
    Route::get('/cities', [PrayerTimeController::class, 'cities']);
});

// Sanctum pour l'authentification
Route::middleware('auth:sanctum')->group(function () {
});