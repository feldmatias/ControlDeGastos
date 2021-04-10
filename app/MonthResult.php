<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthResult extends BasicMonthModel{

    public function store($request){
        $this->amount = $request->get('amount');
        $this->month_id = $request->get('month_id');
        $this->month_result_value_id = $request->get('month_result_value_id');
        $this->save();
    }

    public static function getValidationRules(){
        return ['id' => 'required|numeric',
                'amount' => 'required|numeric',
                'month_id' => 'required|numeric|min:1',
                'month_result_value_id' => 'required|numeric|min:1',
            ];
    }
}
