<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_locations', function (Blueprint $table) {
            $table->bigIncrements('location_id');
            $table->string('almirah_no')->index();
            $table->string('shelf_no')->index();
            $table->string('rack_no')->nullable();
            $table->foreignId('college_id')->references('college_id')->on('colleges')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('entry_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_locations');
    }
};
