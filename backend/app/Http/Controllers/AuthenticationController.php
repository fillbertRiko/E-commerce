<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'stastus' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        } else {
            $credentials =
                [
                    'email' => $request->input('email'),
                    'password' => $request->input('password'),
                ];

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'message' => 'Authentication successful',
                    'token' => $token,
                    'user' => $user,
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Either email or password is incorrect.',
                    'errors' => [
                        'email' => 'The provided credentials do not match our records.',
                    ]
                ], 401);
            }
        }
    }
}
