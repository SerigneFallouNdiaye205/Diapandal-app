<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('prayer_times', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->string('hijri_date')->nullable();
            $table->time('fajr');
            $table->time('sunrise');
            $table->time('dhuhr');
            $table->time('asr');
            $table->time('maghrib');
            $table->time('isha');
            $table->string('city')->default('Touba');
            $table->string('calculation_method')->default('UOIF');
            $table->timestamps();
            
            $table->index(['date', 'city']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('prayer_times');
    }
};