<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'image_url', 'category_id', 'availability', 'type'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
