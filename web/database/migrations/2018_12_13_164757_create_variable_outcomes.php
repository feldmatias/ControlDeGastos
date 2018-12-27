<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVariableOutcomes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variable_outcomes', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->unsignedInteger('amount');
            $table->unsignedInteger('month_id');
            $table->string('type');
            $table->boolean('extra');
        });

        Schema::create('variable_outcome_types', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('name');
            $table->boolean('deleted')->default(false);
        });

        DB::table('variable_outcome_types')->insert([
            ['name' => 'Vea'],
            ['name' => 'Gas'],
            ['name' => 'Sube'],
            ['name' => 'Verdulería'],
            ['name' => 'Limpieza'],
            ['name' => 'Carnicería'],
            ['name' => 'Sodero'],
            ['name' => 'Nafta'],
            ['name' => 'Farmacia'],
            ['name' => 'Pollería'],
            ['name' => 'Tenis'],
            ['name' => 'Librería'],
            ['name' => 'Pescadería'],
            ['name' => 'Diarco'],
            ['name' => 'Cine'],
            ['name' => 'Pigmento'],
            ['name' => 'Varios'],
            ['name' => 'Vital'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('variable_outcomes');
        Schema::dropIfExists('variable_outcome_types');
    }
}
