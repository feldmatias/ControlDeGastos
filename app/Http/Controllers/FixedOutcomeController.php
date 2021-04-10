<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FixedOutcome;
use App\FixedOutcomeType;

class FixedOutcomeController extends BasicController{
    
    public function store(Request $request){
        $this->validateRequest($request, FixedOutcome::getValidationRules());
        $outcome = FixedOutcome::findOrNew($request->get('id'));
        $outcome->store($request);
        return $outcome->id;
    }

    public function createType(Request $request){
        $this->validateRequest($request, FixedOutcomeType::getValidationRules());
        $type = FixedOutcomeType::firstOrNew(['name' => $request->get('name')]);
        $type->store($request);
        return $type->id;
    }

    public function deleteType($id){
        $type = FixedOutcomeType::find($id);
        $type->disable();
    }
}
