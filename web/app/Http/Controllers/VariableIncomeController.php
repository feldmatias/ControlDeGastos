<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VariableIncome;

class VariableIncomeController extends BasicController{
    
    public function store(Request $request){
        $this->validateRequest($request, VariableIncome::getValidationRules());
        $income = new VariableIncome();
        $income->store($request);
        return $income->id;
    }

    public function delete($id){
        $income = VariableIncome::find($id);
        $income->delete();
    }
}
