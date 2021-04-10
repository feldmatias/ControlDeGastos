<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Month extends Model{
    protected $hidden = ['created_at', 'updated_at', 'start', 'end'];

    protected $casts = ['year' => 'integer', 'month' => 'integer', 'initial_balance' => 'integer', 'merge_with_next_month' => 'boolean'];

    protected $appends = ['start', 'end', 'clinics', 'departments', 'fixed_outcomes', 
                          'variable_outcomes', 'dollar_purchases', 'results', 'variable_incomes', 
                          'merged_previous_month', 'merged_month_data'];

    public function getStartAttribute(){
        return Carbon::createFromDate($this->year, $this->month, 1)->startOfMonth();
    }

    public function getEndAttribute(){
        return Carbon::createFromDate($this->year, $this->month, 1)->endOfMonth();
    }

    public function getMergedPreviousMonthAttribute(){
        $previous = $this->getPreviousMonth();
        if (!$previous){
            return false;
        }
        return $previous->merge_with_next_month;
    }

    public function getMergedMonthDataAttribute(){
        $data = new MonthBalance();
        if ($this->merged_previous_month){
            $data->calculateForMonth($this->getPreviousMonth());
        }
        return $data;
    }

    public function mergeWithNextMonth($merge){
        $this->merge_with_next_month = $merge;
        $this->save();
    }

    public function getClinicsAttribute(){
        return Clinic::getByMonth($this);
    }

    public function getDepartmentsAttribute(){
        return Department::getByMonth($this);
    }

    public function getFixedOutcomesAttribute(){
        return FixedOutcomeType::getByMonth($this);
    }

    public function getVariableOutcomesAttribute(){
        return VariableOutcome::getByMonth($this);
    }

    public function getVariableIncomesAttribute(){
        return VariableIncome::getByMonth($this);
    }

    public function getDollarPurchasesAttribute(){
        return DollarPurchase::getByMonth($this);
    }

    public function getResultsAttribute(){
        return MonthResultValue::getByMonth($this);
    }

    public function getCalculatedInitialBalanceAttribute($value){
        $total = 0;
        $previous = $this->getPreviousMonth();
        if (!$previous){
            return intval($value);
        }

        $total = $previous->results->reduce(function($total, $result){
            return $total + $result->monthResults->sum('amount');
        });

        $this->calculated_initial_balance = $total;
        $this->save();
        return $total;
    }

    public function getPreviousMonth(){
        $date = $this->start->copy()->subMonths(1);
        return Month::where('year', $date->year)->where('month', $date->month)->first();
    }

    public static function createCurrentMonth(){
        $now = Carbon::now();
        $month = new Month();
        $month->year = $now->year;
        $month->month = $now->month;
        $month->save();
    }

    public function deleteAllData(){
        $this->hasMany('App\ClinicOutcome')->delete();
        $this->hasMany('App\FixedOutcome')->delete();
        $this->hasMany('App\VariableOutcome')->delete();
        $this->hasMany('App\VariableIncome')->delete();
        $this->hasMany('App\DollarPurchase')->delete();
        $this->hasMany('App\DepartmentIncome')->delete();
        $this->hasMany('App\MonthResult')->delete();
        ClinicIncome::where('date', '>=', $this->start->toDateString())
                    ->where('date', '<=', $this->end->toDateString())
                    ->delete();

        $this->delete();
    }

    public function updateInitialBalance($request){
        $this->initial_balance = $request->get('initial_balance');
        $this->save();
    }

    public static function getInitialBalanceValidationRules(){
        return ['id' => 'required|numeric|min:1',
                'initial_balance' => 'required|numeric'
            ];
    }
    
}
