<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class DatabaseBackupController extends Controller
{
    public function backup(){
        $backup = $this->getBackupDatabase();

        $this->saveBackupToFile($backup);

        $this->sendMail($backup);
    }

    private function getBackupDatabase(){        
        $result = '';

        //get all of the tables
        $tables = DB::connection()->getDoctrineSchemaManager()->listTableNames();
        
        foreach($tables as $table) {
            $data = DB::table($table)->get();
            
            $tableCreate = array_values((array)DB::select('SHOW CREATE TABLE ' . $table)[0])[1];

            $result .= "\n\n\n -- TABLE: " . $table;
            $result .= "\n\n" . $tableCreate . ";\n\n";

            foreach ($data as $item) {
                $keys = array_keys((array)$item);
                $values = array_values((array)$item);
                $values = array_map(function($value) { return $value !== null ? "'" . $value . "'" : "NULL"; }, $values);

                $insert = "INSERT INTO " . $table . " (" . implode(",", $keys) . ")";
                $insert .= " VALUES(" . implode(",", $values) . ");";

                $result .= $insert . "\n";
            }

        }

        return $result;
    }

    private function saveBackupToFile($backup){
        Storage::put($this->getBackupFileName(), $backup);
    }

    private function sendMail($backup){
        $from = config('app.backup_mail');
        $to = config('app.backup_mail');
        $subject = "Backup " . Carbon::now()->toDateTimeString();;

        $separator = md5(time());
        $filename = $this->getBackupFileName();
        $attachment = chunk_split(base64_encode(file_get_contents(storage_path("app/" . $filename))));

        $headers = "From: " . $from . PHP_EOL;
        $headers .= "MIME-Version: 1.0" . PHP_EOL;
        $headers .= "Content-Type: multipart/mixed; boundary=\"" .$separator . "\"";

        $body = "--" . $separator . PHP_EOL;
        $body .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"" . PHP_EOL;
        $body .= "Content-Transfer-Encoding: base64" . PHP_EOL;
        $body .= "Content-Disposition: attachment" . PHP_EOL . PHP_EOL;
        $body .= $attachment . PHP_EOL;
        $body .= "--" . $separator . "--";

        mail($to, $subject, $body, $headers);
    }

    private function getBackupFileName(){
        return config('app.name') . "_backup.sql";;
    }


}
