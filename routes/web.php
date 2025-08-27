<?php

use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Start');
});


Route::get('/survey', function () {
    return Inertia::render('Survey');
})->name('survey');

Route::get('/questions/section1', [QuestionController::class, 'getSection1Questions'])->name('questions.section1');
Route::post('/submit-section1', [QuestionController::class, 'submitSection1'])->name('submit.section1');

Route::get('/section2/{category}', [QuestionController::class, 'getSection2Questions']);
Route::post('/submit-survey/{category}', [QuestionController::class, 'submitSurvey'])->name('submit.survery');
