<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Month;
use App\MonthResult;
use App\MonthResultValue;

class MonthController extends BasicController{

    const max_months_stored = 5;
    
    public function storeResult(Request $request){
        $this->validateRequest($request, MonthResult::getValidationRules());
        $result = MonthResult::findOrNew($request->get('id'));
        $result->store($request);
        return $result->id;
    }

    public function createResultValue(Request $request){
        $this->validateRequest($request, MonthResultValue::getValidationRules());
        $type = MonthResultValue::firstOrNew(['name' => $request->get('name')]);
        $type->store($request);
        return $type->id;
    }

    public function deleteResultValue($id){
        $type = MonthResultValue::find($id);
        $type->disable();
    }

    public function updateInitialBalance(Request $request){
        $this->validateRequest($request, Month::getInitialBalanceValidationRules());
        $month = Month::find($request->get('id'));
        $month->updateInitialBalance($request);
    }

    public static function checkCurrentMonth(){
        $now = Carbon::now();
        if (!Month::where('year', $now->year)->where('month', $now->month)->exists()){
            Month::createCurrentMonth();
        }

        if (Month::where('merge_with_next_month', false)->count() > self::max_months_stored){
            $oldest = Month::where('merge_with_next_month', false)->orderBy('id', 'asc')->first();
            if ($oldest_merge = $oldest->getPreviousMonth()){
                $oldest_merge->deleteAllData();
            }
            $oldest->deleteAllData();
        }
    }

    public function mergeWithNextMonth($id){
        $month = Month::find($id);
        $month->mergeWithNextMonth(true);
        return DataController::get($id);
    }

    public function unmergeWithNextMonth($id){
        $month = Month::find($id);
        $month->mergeWithNextMonth(false);
        return DataController::get($id);
    }
}
