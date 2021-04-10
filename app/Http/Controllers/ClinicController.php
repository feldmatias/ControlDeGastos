<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clinic;
use App\ClinicIncome;
use App\ClinicOutcome;
use App\ClinicOutcomeType;

class ClinicController extends BasicController{
    public function storeIncome(Request $request){
        $this->validateRequest($request, ClinicIncome::getValidationRules());
        $income = new ClinicIncome();
        $income->store($request);
        return $income->id;
    }

    public function deleteIncome($id){
        $income = ClinicIncome::find($id);
        $income->delete();
    }

    public function storeOutcome(Request $request){
        $this->validateRequest($request, ClinicOutcome::getValidationRules());
        $outcome = new ClinicOutcome();
        $outcome->store($request);
        return $outcome->id;
    }

    public function deleteOutcome($id){
        $outcome = ClinicOutcome::find($id);
        $outcome->delete();
    }

    public function createOutcomeType(Request $request){
        $this->validateRequest($request, ClinicOutcomeType::getValidationRules());
        $type = ClinicOutcomeType::firstOrNew(['name' => $request->get('name')]);
        $type->store($request);
        return $type->id;
    }

    public function deleteOutcomeType($id){
        $type = ClinicOutcomeType::find($id);
        $type->disable();
    }

    public function create(Request $request){
        $this->validateRequest($request, Clinic::getValidationRules());
        $clinic = Clinic::firstOrNew(['name' => $request->get('name')]);
        $clinic->store($request);
        return $clinic->id;
    }

    public function delete($id){
        $clinic = Clinic::find($id);
        $clinic->disable();
    }
}
