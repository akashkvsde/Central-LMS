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
        Schema::create('assign_navigations', function (Blueprint $table) {
            $table->bigIncrements('navigation_id');
            $table->foreignId('user_role_id')->references('user_role_id')->on('user_roles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('nav_page_id')->references('nav_page_id')->on('navigation_pages')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('entry_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assign_navigations');
    }
};
