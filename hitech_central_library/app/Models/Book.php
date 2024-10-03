<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $primaryKey = 'book_id'; // Specify the primary key column

    protected $fillable = [
        'accession_no',
        'book_title_id',
        'first_author_id',
        'second_author_id',
        'third_author_id',
        'publisher_id',
        'volume',
        'editor',
        'translator',
        'compiler',
        'edition',
        'edition_year',
        'publish_year',
        'no_of_pages',
        'isbn_no',
        'language',
        'series',
        'source',
        'content',
        'currency_id',
        'document_id',
        'dept_id',
        'vendor_id',
        'bill_id',
        'suppl_copies',
        'abstract',
        'nature_of_binding',
        'entry_date',
        'notes',
        'keywords',
        'call_no',
        'book_price',
        'book_image',
        'college_id',
        'location_id',
        'book_status',
        'entry_by'
    ];



    public static function checkAccessionNumbers(array $accessionNos)
    {
        return self::whereIn('accession_no', $accessionNos)->pluck('accession_no')->toArray();
    }
}
