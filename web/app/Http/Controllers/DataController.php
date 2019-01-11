<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ClinicOutcomeType;
use App\VariableOutcomeType;
use App\Month;

class DataController extends Controller{
    
    public static function get($id = 0){
        MonthController::checkCurrentMonth();

        $month = Month::findOrNew($id);
        if (!$month->id){
            $month = Month::latest()->first();
        }

        $data = ['clinic_outcome_types' => ClinicOutcomeType::orderBy('name')->get(),
                 'variable_outcome_types' => VariableOutcomeType::orderBy('name')->get(),
                 'months' => Month::get()->map(function ($element){
                    return $element->only('id', 'month', 'year');
                }),
                 'month' => $month,
                ];

        return response()->json($data);
    }

}
