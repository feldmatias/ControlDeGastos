<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthResultValue extends BasicDeletableModel{

    public function monthResults(){
        return $this->hasMany('App\MonthResult');
    }

    public static function getByMonth($month){
        return MonthResultValue::with(['monthResults' => function($query) use($month){
            $query->whereHas('month', function($subquery) use ($month){
                $subquery->where('id', $month->id);
            });
        }])->orderBy('name')->get();
    }
}
