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
        Schema::create('vendors', function (Blueprint $table) {
            $table->bigIncrements('vendor_id');
            $table->string('vendor_name')->index();
            $table->string('vendor_email')->index();
            $table->string('vendor_contact')->index();
            $table->string('vendor_address')->index();
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
        Schema::dropIfExists('vendors');
    }
};
