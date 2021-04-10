<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClinicOutcomes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clinic_outcomes', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->unsignedInteger('month_id');
            $table->unsignedInteger('amount');
            $table->unsignedInteger('clinic_id');
            $table->string('type');
        });

        Schema::create('clinic_outcome_types', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('name');
            $table->boolean('deleted')->default(false);
        });

        DB::table('clinic_outcome_types')->insert([
            ['name' => 'Cable'],
            ['name' => 'Aadi capif'],
            ['name' => 'Canon'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clinic_outcome_types');
        Schema::dropIfExists('clinic_outcomes');
    }
}
