<?php

namespace App\Http\Controllers\Web\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    public function register()
    {
        return view('auth.register');
    }

    public function registerPost(Request $request)
    {
        $request->validate([
            'email' => 'required|unique:users|string|max:255|email',
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8|max:255'
        ]);

        $user = new User();
        $user->id = Str::uuid()->toString();
        $user->fill($request->only($user->getFillable()));
        $user->password = Hash::make($request->post('password'));
        $user->save();

        Auth::login($user);
        return redirect()->intended(route('home'));
    }
}
