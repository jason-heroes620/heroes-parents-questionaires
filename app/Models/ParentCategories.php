<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParentCategories extends Model
{
    protected $table = 'parent_categories';
    protected $fillable = [
        'category',
        'description'
    ];
}
