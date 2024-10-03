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
        Schema::create('books', function (Blueprint $table) {
            $table->bigIncrements('book_id');
            $table->string('accession_no')->index();
            $table->foreignId('book_title_id')->references('book_title_id')->on('book_titles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('first_author_id')->references('author_id')->on('authors')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('second_author_id')->references('author_id')->on('authors')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('third_author_id')->references('author_id')->on('authors')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('publisher_id')->references('publisher_id')->on('publishers')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->string('volume')->nullable();
            $table->string('editor')->nullable()->index();
            $table->string('translator')->nullable()->index();
            $table->string('compiler')->nullable()->index();
            $table->string('edition')->nullable()->index();
            $table->string('edition_year')->nullable()->index();
            $table->string('publish_year')->nullable()->index();
            $table->string('no_of_pages')->nullable();
            $table->string('isbn_no')->nullable();
            $table->string('language')->nullable();
            $table->string('series')->nullable();
            $table->string('source')->nullable();
            $table->string('content')->nullable();
            $table->foreignId('currency_id')->references('curr_id')->on('currencies')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('document_id')->references('document_id')->on('document_types')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('subject_id')->references('subject_id')->on('subjects')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('vendor_id')->references('vendor_id')->on('vendors')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('bill_id')->references('bill_id')->on('bill_details')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->string('suppl_copies')->nullable();
            $table->string('abstract')->index()->nullable();
            $table->string('nature_of_binding')->nullable();
            $table->string('entry_date')->nullable();
            $table->string('notes')->nullable();
            $table->string('keywords')->index()->nullable();
            $table->string('call_no')->index()->nullable();
            $table->string('book_price')->nullable();
            $table->string('book_image')->nullable();
            $table->foreignId('college_id')->references('college_id')->on('colleges')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->foreignId('location_id')->references('location_id')->on('book_locations')->onDelete('cascade')->onUpdate('cascade')->nullable();
            $table->string('book_status')->default('inlibrary');
            $table->integer('entry_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
