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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('user_id');
            $table->string('name')->index();
            $table->string('email')->unique()->index();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('contact')->index();
            $table->string('address')->index();
            $table->string('gender')->index();
            $table->string('image')->nullable();
            $table->string('document')->nullable();
            $table->string('library_card_number')->index();
            $table->string('batch_year')->nullable();
            $table->string('designation')->nullable();
            $table->foreignId('course_id')->references('course_id')->on('courses')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('dept_id')->references('dept_id')->on('departments')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('college_id')->references('college_id')->on('colleges')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->string('user_status');
            $table->integer('entry_by')->nullable();
            $table->rememberToken()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
