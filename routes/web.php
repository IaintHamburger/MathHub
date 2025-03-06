<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProblemController;

Route::get('/', function () {
    return view('home');
});
Route::get('/problems', [ProblemController::class, 'index']);
