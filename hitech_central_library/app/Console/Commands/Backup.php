<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;


class Backup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Data backup';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file="backup_".strtotime(now()).".sql";
        $command = "mysqldump database -user=".env('DB_USERNAME')." --password=". env('DB_PASSWORD')." --host=".env('DB_HOST')." "
        .env('DB_DATABASE')." > ".storage_path('app/backup/').$file;
        exec($command);
        Log::channel('BACKUP')->info('Backup done');
    }
}
