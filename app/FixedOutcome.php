<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FixedOutcome extends BasicMonthModel{

    public function store($request){
        $this->amount = $request->get('amount');
        $this->month_id = $request->get('month_id');
        $this->fixed_outcome_type_id = $request->get('fixed_outcome_type_id');
        $this->save();
    }

    public static function getValidationRules(){
        return ['id' => 'required|numeric',
                'amount' => 'required|numeric',
                'month_id' => 'required|numeric|min:1',
                'fixed_outcome_type_id' => 'required|numeric|min:1',
            ];
    }
}
