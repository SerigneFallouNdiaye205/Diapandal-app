<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrayerTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'hijri_date',
        'fajr',
        'sunrise',
        'dhuhr',
        'asr',
        'maghrib',
        'isha',
        'city',
        'calculation_method'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function scopeForCity($query, $city = 'Touba')
    {
        return $query->where('city', $city);
    }

    public function scopeForDate($query, $date)
    {
        return $query->where('date', $date);
    }
}