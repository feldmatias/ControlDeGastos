<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FixedOutcomeType extends BasicDeletableModel{

    public function fixedOutcomes(){
        return $this->hasMany('App\FixedOutcome');
    }

    public static function getByMonth($month){
        return FixedOutcomeType::with(['fixedOutcomes' => function($query) use($month){
            $query->whereHas('month', function($subquery) use ($month){
                $subquery->where('id', $month->id);
            });
        }])->orderBy('name')->get();
    }
}
