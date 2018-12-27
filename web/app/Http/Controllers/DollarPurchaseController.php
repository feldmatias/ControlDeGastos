<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DollarPurchase;

class DollarPurchaseController extends BasicController{
    
    public function store(Request $request){
        $this->validateRequest($request, DollarPurchase::getValidationRules());
        $purchase = new DollarPurchase();
        $purchase->store($request);
        return $purchase->id;
    }

    public function delete($id){
        $purchase = DollarPurchase::find($id);
        $purchase->delete();
    }
}
