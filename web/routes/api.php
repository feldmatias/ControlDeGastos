<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('getMonthData/{id?}', 'DataController@get');

Route::post('fixedOutcome/store', 'FixedOutcomeController@store');
Route::post('fixedOutcome/type/create', 'FixedOutcomeController@createType');
Route::post('fixedOutcome/type/delete/{id}', 'FixedOutcomeController@deleteType');

Route::post('variableOutcome/store', 'VariableOutcomeController@store');
Route::post('variableOutcome/delete/{id}', 'VariableOutcomeController@delete');
Route::post('variableOutcome/type/create', 'VariableOutcomeController@createType');
Route::post('variableOutcome/type/delete/{id}', 'VariableOutcomeController@deleteType');

Route::post('department/income/store', 'DepartmentController@storeIncome');
Route::post('department/create', 'DepartmentController@create');
Route::post('department/delete/{id}', 'DepartmentController@delete');

Route::post('clinic/income/store', 'ClinicController@storeIncome');
Route::post('clinic/income/delete/{id}', 'ClinicController@deleteIncome');
Route::post('clinic/outcome/store', 'ClinicController@storeOutcome');
Route::post('clinic/outcome/delete/{id}', 'ClinicController@deleteOutcome');
Route::post('clinic/outcome/type/create', 'ClinicController@createOutcomeType');
Route::post('clinic/outcome/type/delete/{id}', 'ClinicController@deleteOutcomeType');
Route::post('clinic/create', 'ClinicController@create');
Route::post('clinic/delete/{id}', 'ClinicController@delete');

Route::post('variableIncome/store', 'VariableIncomeController@store');
Route::post('variableIncome/delete/{id}', 'VariableIncomeController@delete');

Route::post('dollarPurchase/store', 'DollarPurchaseController@store');
Route::post('dollarPurchase/delete/{id}', 'DollarPurchaseController@delete');

Route::post('month/result/store', 'MonthController@storeResult');
Route::post('month/result/type/create', 'MonthController@createResultValue');
Route::post('month/result/type/delete/{id}', 'MonthController@deleteResultValue');
Route::post('month/initialBalance/update', 'MonthController@updateInitialBalance');
