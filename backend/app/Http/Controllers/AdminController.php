<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AdminController extends Controller
{
    public function dashboard()
    {
        return view('admin.pages.dashboard');
    }

    public function settings()
    {
        return view('admin.pages.settings');
    }

    public function users()
    {
        return view('admin.pages.users');
    }

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:admin');
    }
    public function profile()
    {
        $user = Auth::user();
        return view('admin.pages.profile', ['user' => $user]);
    }
    public function editProfile()
    {
        $user = Auth::user();
        return view('admin.pages.edit-profile', ['user' => $user]);
    }
    public function updateProfile(Request $request)
    {
        $user = User::find(Auth::id());
        if (!$user) {
            return redirect()->back()->withErrors(['user' => 'User not found.']);
        }
        $data = $request->all();
        foreach ($data as $key => $value) {
            $user->$key = $value;
        }
        $user->save();
        return redirect()->route('admin.profile')->with('success', 'Profile updated successfully.');
    }
    public function changePassword()
    {
        return view('admin.pages.change-password');
    }
    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return redirect()->back()->withErrors(['current_password' => 'Current password is incorrect.']);
        }

        if (!Hash::check($request->new_password, $user->password)) {
            return redirect()->back()->withErrors(['new_password' => 'New password cannot be the same as the current password.']);
        }
        $user->password = Hash::make($request->new_password);
        $user = User::where('id', $user->id)->update(['password' => $user->password]);

        Auth::logout(); // Log out the user after password change
        $request->session()->invalidate(); // Invalidate the session
        $request->session()->regenerateToken(); // Regenerate CSRF token

        return redirect()->route('login')->with('success', 'Password updated successfully.');
    }
    public function logout()
    {
        Auth::logout();
        return redirect()->route('login')->with('success', 'Logged out successfully.');
    }
    public function importDetails()
    {
        // Logic to fetch and display import details
        return view('admin.pages.import-details');
    }
    public function importDetail($id)
    {
        // Logic to fetch and display a specific import detail by ID
        return view('admin.pages.import-detail', ['id' => $id]);
    }
}
