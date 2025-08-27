<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    protected $table = 'survey_responses';

    protected $fillable = [
        'name',
        'email',
        'category',
        'sub_category',
        'section1_responses',
        'section2_responses'
    ];
}
