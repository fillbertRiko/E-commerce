<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
                $response = [
                    'status' => true,
                    'user' => $user
                ];

                if ($user->role::class === 'super_admin') {
                    $response['message'] = 'Super Admin authenticated successfully.';
                } elseif ($user->role::class === 'admin') {
                    $response['message'] = 'Admin authenticated successfully.';
                } else {
                    $response['message'] = 'User authenticated successfully.';
                }

                return response()->json($response, 200);
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

    public function logout(Request $request)
    {
        $user = User::find(Auth::id());
        $user->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully.'
        ], 200);
    }
}
