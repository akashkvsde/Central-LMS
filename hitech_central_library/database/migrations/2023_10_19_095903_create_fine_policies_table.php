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
        Schema::create('fine_policies', function (Blueprint $table) {
            $table->bigIncrements('fine_policy_id');
            $table->string('user_type')->index();
            $table->foreignId('issue_type_id')->references('issue_type_id')->on('issue_types')->onDelete('cascade')->onUpdate('cascade');
            $table->string('exceed_days');
            $table->string('fine_policy_amount');
            $table->string('status');
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
        Schema::dropIfExists('fine_policies');
    }
};
