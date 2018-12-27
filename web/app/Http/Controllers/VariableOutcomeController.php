<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VariableOutcome;
use App\VariableOutcomeType;

class VariableOutcomeController extends BasicController{
    
    public function store(Request $request){
        $this->validateRequest($request, VariableOutcome::getValidationRules());
        $outcome = new VariableOutcome();
        $outcome->store($request);
        return $outcome->id;
    }

    public function delete($id){
        $outcome = VariableOutcome::find($id);
        $outcome->delete();
    }

    public function createType(Request $request){
        $this->validateRequest($request, VariableOutcomeType::getValidationRules());
        $type = VariableOutcomeType::firstOrNew(['name' => $request->get('name')]);
        $type->store($request);
        return $type->id;
    }

    public function deleteType($id){
        $type = VariableOutcomeType::find($id);
        $type->disable();
    }
}
