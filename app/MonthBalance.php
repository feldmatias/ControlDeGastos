<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthBalance extends BaseModel{

    public function __construct(){
        $this->initial_balance = 0;
        $this->incomes = 0;
        $this->outcomes = 0;
        $this->dollars = 0;
    }

    public function calculateForMonth($month){
        $this->initial_balance = $month->initial_balance ? $month->initial_balance : $month->calculated_initial_balance;
        $this->calculateIncomes($month);
        $this->calculateOutcomes($month);
        $this->calculateDollars($month);
    }

    private function calculateIncomes($month){
        $this->incomes += $month->clinics->reduce(function ($total, $clinic){
            return $total + $clinic->clinicIncomes->sum('amount') - $clinic->clinicOutcomes->sum('amount');
        }, 0);

        $this->incomes += $month->departments->reduce(function ($total, $department){
            return $total + $department->departmentIncomes->sum('amount');
        }, 0);

        $this->incomes += $month->variable_incomes->sum('amount');
    }

    private function calculateOutcomes($month){
        $this->outcomes += $month->fixed_outcomes->reduce(function ($total, $outcome){
            return $total + $outcome->fixedOutcomes->sum('amount');
        }, 0);

        $this->outcomes += $month->variable_outcomes->sum('amount');
    }

    private function calculateDollars($month){
        $this->dollars += $month->dollar_purchases->sum('pesos_amount');
    }
}
