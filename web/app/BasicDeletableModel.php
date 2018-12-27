<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BasicDeletableModel extends Model{
    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = ['deleted' => 'boolean'];

    protected $fillable = ['name'];

    public function store($request){
        $this->name = $request->get('name');
        $this->deleted = false;
        $this->save();
    }

    public function disable(){
        $this->deleted = true;
        $this->save();
    }

    public static function getValidationRules(){
        return ['name' => 'required|string'];
    }
}
