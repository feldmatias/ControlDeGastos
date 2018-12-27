<?php

namespace App\Http\Middleware;

use Closure;

class ApiMiddleware{
    public function handle($request, Closure $next){
        if ($request->get('apiKey') != config('app.api_key')){
            abort(403);
        }
        return $next($request);
    }
}
