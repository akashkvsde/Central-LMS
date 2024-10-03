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
        Schema::create('publishers', function (Blueprint $table) {
            $table->bigIncrements('publisher_id');
            $table->string('publisher_name')->index();
            $table->string('publisher_place')->index();
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
        Schema::dropIfExists('publishers');
    }
};
