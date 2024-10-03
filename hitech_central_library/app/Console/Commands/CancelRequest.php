<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CancelRequest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cancelRequest:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancelation of Request daily at 00:00';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $updt = DB::table('books')
            ->whereRaw('TIMESTAMPDIFF(hour,updated_at,current_time())=?', [0])
            ->where('book_status', '=', 'requested')
            ->update(['book_status' => 'inlibrary', 'updated_at' => now()]);
        if ($updt) {

            DB::table('book_issues')
                ->whereRaw('TIMESTAMPDIFF(hour,created_at,current_time()) =?', [0])
                ->where('book_issue_status', '=', 'requested')
                ->delete();
            Log::channel('LMS')->info('Execution Success');
        } else {
            Log::channel('LMS')->info('Execution Success Nothing To Cancel');
        }
    }
}
