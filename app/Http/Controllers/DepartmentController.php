<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Department;
use App\DepartmentIncome;

class DepartmentController extends BasicController{
    
    public function storeIncome(Request $request){
        $this->validateRequest($request, DepartmentIncome::getValidationRules());
        $income = DepartmentIncome::findOrNew($request->get('id'));
        $income->store($request);
        return $income->id;
    }

    public function create(Request $request){
        $this->validateRequest($request, Department::getValidationRules());
        $department = Department::firstOrNew(['name' => $request->get('name')]);
        $department->store($request);
        return $department->id;
    }

    public function delete($id){
        $department = Department::find($id);
        $department->disable();
    }
}
