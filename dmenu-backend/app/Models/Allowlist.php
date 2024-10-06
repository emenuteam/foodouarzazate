<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allowlist extends Model
{
    use HasFactory;

    protected $fillable = ['email'];  // Mass assignable fields

    // Optionally, if you don't want to use `created_at` or `updated_at`:
    // public $timestamps = false;
}
