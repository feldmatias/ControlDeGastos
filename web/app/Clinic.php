<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clinic extends BasicDeletableModel{
    
    public function clinicIncomes(){
        return $this->hasMany('App\ClinicIncome')->orderBy('date');
    }

    public function clinicOutcomes(){
        return $this->hasMany('App\ClinicOutcome');
    }

    public static function getByMonth($month){
        return Clinic::with(['clinicIncomes' => function($query) use($month){
            $query->where('date', '>=', $month->start->toDateString());
            $query->where('date', '<=', $month->end->toDateString());
        }])->with(['clinicOutcomes' => function($query) use($month){
            $query->whereHas('month', function($subquery) use ($month){
                $subquery->where('id', $month->id);
            });
        }])->get();
    }
}
