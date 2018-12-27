<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BasicMonthModel extends Model{
    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = ['amount' => 'integer'];

    public function month(){
        return $this->belongsTo('App\Month');
    }
}
