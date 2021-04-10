<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DollarPurchase extends BasicMonthModel{

    protected $casts = ['dollar_amount' => 'integer', 'pesos_amount' => 'integer'];

    public function store($request){
        $this->dollar_amount = $request->get('dollar_amount');
        $this->pesos_amount = $request->get('pesos_amount');
        $this->month_id = $request->get('month_id');
        $this->save();
    }

    public static function getByMonth($month){
        return DollarPurchase::whereHas('month', function($query) use ($month){
                $query->where('id', $month->id);
            })->get();
    }

    public static function getValidationRules(){
        return ['dollar_amount' => 'required|numeric',
                'pesos_amount' => 'required|numeric',
                'month_id' => 'required|numeric|min:1',
            ];
    }
    
}
