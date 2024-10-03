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
        Schema::create('book_issues', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('issue_type_id')->references('issue_type_id')->on('issue_types')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('college_id')->references('college_id')->on('colleges')->onDelete('cascade')->onUpdate('cascade');
            $table->string('accession_no')->index();
            $table->string('issue_date')->nullable();
            $table->foreignId('user_id')->references('user_id')->on('users')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->string('emp_name')->nullable();
            $table->string('emp_id')->nullable()->index();
            $table->string('emp_email')->nullable()->index();
            $table->string('emp_contact')->nullable()->index();
            $table->foreignId('dept_id')->references('dept_id')->on('departments')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->string('designation')->nullable();
            $table->string('document')->nullable();
            $table->string('book_issue_status');
            $table->string('user_type');
            $table->string('entry_by');
            $table->string('return_entry_by')->nullable();
            $table->string('return_date')->nullable();
            $table->string('return_document')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_issues');
    }
};
