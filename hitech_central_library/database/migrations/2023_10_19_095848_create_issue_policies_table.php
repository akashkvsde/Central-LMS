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
        Schema::create('issue_policies', function (Blueprint $table) {
            $table->bigIncrements('issue_policy_id');
            $table->integer('user_type')->index();
            $table->string('max_book')->index();
            $table->foreignId('issue_type_id')->references('issue_type_id')->on('issue_types')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('issue_policies');
    }
};
