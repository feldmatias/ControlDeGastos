<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFixedOutcomes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fixed_outcomes', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->unsignedInteger('amount');
            $table->unsignedInteger('month_id');
            $table->unsignedInteger('fixed_outcome_type_id');
        });

        Schema::create('fixed_outcome_types', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('name');
            $table->boolean('deleted')->default(false);
        });

        DB::table('fixed_outcome_types')->insert([
            ['name' => 'Expensas'],
            ['name' => 'Italiano'],
            ['name' => 'Macabi'],
            ['name' => 'Banco'],
            ['name' => 'Banco - Ka'],
            ['name' => 'Banco - Focus'],
            ['name' => 'Banco - Monotributo'],
            ['name' => 'Banco - Netflix'],
            ['name' => 'Banco - Autopista'],
            ['name' => 'Banco - Francés'],
            ['name' => 'Banco - Visa'],
            ['name' => 'Claro'],
            ['name' => 'Telecentro'],
            ['name' => 'Expensas cocheras'],
            ['name' => 'Ingresos brutos'],
            ['name' => 'Seguro casas'],
            ['name' => 'Rentas'],
            ['name' => 'Edesur'],
            ['name' => 'Metrogas'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fixed_outcomes');
        Schema::dropIfExists('fixed_outcome_types');
    }
}
