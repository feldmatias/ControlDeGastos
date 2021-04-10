<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends BasicDeletableModel{
    
    public function departmentIncomes(){
        return $this->hasMany('App\DepartmentIncome');
    }

    public static function getByMonth($month){
        return Department::with(['departmentIncomes' => function($query) use($month){
            $query->whereHas('month', function($subquery) use ($month){
                $subquery->where('id', $month->id);
            });
        }])->orderBy('name')->get();
    }
}
