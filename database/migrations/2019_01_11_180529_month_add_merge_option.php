<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MonthAddMergeOption extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('months', function (Blueprint $table) {
            $table->boolean('merge_with_next_month')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('months', function (Blueprint $table) {
            $table->dropColumn('merge_with_next_month');
        });
    }
}
