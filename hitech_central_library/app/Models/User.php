<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasApiTokens,HasFactory;
    protected $table="users";
    protected $primaryKey="user_id";
    protected $fillable = [
        'name',
        'email',
        'password',
        'contact',
        'address',
        'gender',
        'image',
        'document',
        'library_card_number',
        'batch_year',
        'designation',
        'course_id',
        'dept_id',
        'college_id',
        'user_status',
        'entry_by',
    ];
}
