<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-db', function () {
    try {
        DB::connection()->getPDO();
        return "Connected to DB: " . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return $e->getMessage();
    }
});

Route::get('/db-test', function () {
    try {
        \DB::connection()->getPdo();
        return "Connected successfully";
    } catch (\Exception $e) {
        return $e->getMessage();
    }
});

Route::get('/log-test', function () {
    \Log::error("TEST LOG WRITTEN AT " . now());
    return "ok";
});
