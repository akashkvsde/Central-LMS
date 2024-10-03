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
        Schema::create('fine_collections', function (Blueprint $table) {
            $table->bigIncrements('fine_id');
            $table->foreignId('fine_policy_id')->references('fine_policy_id')->on('fine_policies')->onDelete('cascade')->onUpdate('cascade');
            $table->string('library_card_no')->index();
            $table->string('accession_id')->index();
            $table->string('reason')->nullable();
            $table->string('fine_amount')->nullable();
            $table->string('paid_amount');
            $table->string('document')->nullable();
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
        Schema::dropIfExists('fine_collections');
    }
};
