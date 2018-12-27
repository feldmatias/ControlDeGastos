<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DepartmentIncome extends BasicMonthModel{
    
    public function store($request){
        $this->amount = $request->get('amount');
        $this->month_id = $request->get('month_id');
        $this->department_id = $request->get('department_id');
        $this->save();
    }

    public static function getValidationRules(){
        return ['id' => 'required|numeric',
                'amount' => 'required|numeric',
                'month_id' => 'required|numeric|min:1',
                'department_id' => 'required|numeric|min:1',
            ];
    }
}
