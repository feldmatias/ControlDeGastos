<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VariableOutcome extends BasicMonthModel{

    protected $hidden = ['updated_at'];

    protected $casts = ['extra' => 'boolean', 'amount' => 'integer'];
    
    public function store($request){
        $this->amount = $request->get('amount');
        $this->month_id = $request->get('month_id');
        $this->type = $request->get('type');
        $this->extra = $request->get('extra');
        $this->save();
    }

    public static function getByMonth($month){
        return VariableOutcome::whereHas('month', function($query) use ($month){
                $query->where('id', $month->id);
            })->get();
    }

    public static function getValidationRules(){
        return ['amount' => 'required|numeric',
                'month_id' => 'required|numeric|min:1',
                'type' => 'required|string',
                'extra' => 'required|boolean'
            ];
    }
}
