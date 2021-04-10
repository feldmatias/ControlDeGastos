<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

class BasicController extends Controller{
    
    public function validateRequest(Request $request, $rules){
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()){
            abort(403);
        }
    }
}
