<?php

use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\PemeriksaanSampelApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route for authentication
Route::post('register', [AuthApiController::class, 'register']);
Route::post('login', [AuthApiController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthApiController::class, 'user']);
    Route::post('logout', [AuthApiController::class, 'logout']);

    // API Resource routes for PemeriksaanSampel
    Route::apiResource('pemeriksaan-sampels', PemeriksaanSampelApiController::class);
});
