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
        Schema::create('assign_roles', function (Blueprint $table) {
            $table->bigIncrements('assign_role_id');
            $table->foreignId('user_id')->references('user_id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('user_role_id')->references('user_role_id')->on('user_roles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('college_id')->references('college_id')->on('colleges')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->integer('entry_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assign_roles');
    }
};
