<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddMonthResultValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('month_result_values')->insert([
            ['name' => 'Clinicas'],
            ['name' => 'Banco'],
            ['name' => 'Efectivo'],
            ['name' => 'Billeteras'],
            ['name' => 'Mercado pago'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('month_result_values')->truncate();
    }
}
