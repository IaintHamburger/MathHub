<?php

namespace App\Http\Controllers;

use App\Models\Problem;
use Illuminate\Http\Request;

class ProblemController extends Controller
{
    public function index()
    {
        // 從資料庫取出所有題目
        $problems = Problem::all();
        return view('problems', compact('problems'));
    }
}
