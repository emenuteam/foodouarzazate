<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'website_logo', 'physical_address',
        'email_address', 'fax_phone',
        'instagram_link', 'facebook_link', 'bg_image','restaurant_name','subheading'
    ];

    /**
     * Define relationships
     */

    // Relationship to User (owner)
    // public function owner()
    // {
    //     return $this->belongsTo(User::class, 'owner_id');
    // }
}
