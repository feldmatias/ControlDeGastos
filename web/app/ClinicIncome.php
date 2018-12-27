<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClinicIncome extends Model{
    protected $hidden = ['created_at', 'updated_at'];
    
    protected $casts = ['amount' => 'integer'];
    
    public function store($request){
        $this->amount = $request->get('amount');
        $this->clinic_id = $request->get('clinic_id');
        $this->date = $request->get('date');
        $this->save();
    }

    public static function getValidationRules(){
        return ['amount' => 'required|numeric',
                'clinic_id' => 'required|numeric|min:1',
                'date' => 'required|date'
            ];
    }
}
