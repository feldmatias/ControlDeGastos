<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClinicOutcome extends BasicMonthModel{
    
    public function store($request){
        $this->amount = $request->get('amount');
        $this->month_id = $request->get('month_id');
        $this->type = $request->get('type');
        $this->clinic_id = $request->get('clinic_id');
        $this->save();
    }

    public static function getValidationRules(){
        return ['amount' => 'required|numeric',
                'month_id' => 'required|numeric|min:1',
                'type' => 'required|string',
                'clinic_id' => 'required|numeric|min:1'
            ];
    }
}
