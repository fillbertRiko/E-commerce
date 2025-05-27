<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users', ['users' => $users]);
    }

    public function dashboard()
    {
        return view('user.dashboard');
    }
    public function profile()
    {
        $user = Auth::user();
        return Inertia::render('UserProfile', ['user' => $user]);
    }
    public function editProfile()
    {
        $user = Auth::user();
        return Inertia::render('EditProfile', ['user' => $user]);
    }
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $data = $request->all();
        foreach ($data as $key => $value) {
            $user->$key = $value;
        }
        if ($user instanceof \App\Models\User) {
            $user->save();
        }
        return redirect()->route('user.profile')->with('success', 'Profile updated successfully.');
    }
    public function changePassword()
    {
        return Inertia::render('ChangePassword');
    }
    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if (!password_verify($request->current_password, $user->password)) {
            return redirect()->back()->withErrors(['current_password' => 'Current password is incorrect.']);
        }

        $user->password = bcrypt($request->new_password);
        if ($user instanceof \App\Models\User) {
            $user->save();
        }

        return redirect()->route('user.profile')->with('success', 'Password updated successfully.');
    }
    public function settings()
    {
        return Inertia::render('Settings');
    }
    public function notifications()
    {
        return Inertia::render('Notifications');
    }
    public function messages()
    {
        return Inertia::render('Messages');
    }
    public function activity()
    {
        return Inertia::render('Activity');
    }
    public function help()
    {
        return Inertia::render('Help');
    }
    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:user'); // Assuming you have a role middleware
    }
    public function show($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('UserProfile', ['user' => $user]);
    }
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('EditUser', ['user' => $user]);
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
    public function create()
    {
        return Inertia::render('CreateUser');
    }
    public function store(Request $request)
    {
        $user = User::create($request->all());
        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }
    public function search(Request $request)
    {
        $query = $request->input('query');
        $users = User::where('name', 'like', "%{$query}%")
            ->orWhere('email', 'like', "%{$query}%")
            ->get();
        return Inertia::render('Users', ['users' => $users]);
    }
    public function export()
    {
        $users = User::all();
        // Logic to export users, e.g., to CSV or Excel
        return response()->json($users);
    }
    public function import(Request $request)
    {
        // Logic to import users from a file
        $file = $request->file('file');
        // Process the file and create users
        return redirect()->route('users.index')->with('success', 'Users imported successfully.');
    }
    public function notificationsSettings()
    {
        return Inertia::render('NotificationsSettings');
    }
    public function privacySettings()
    {
        return Inertia::render('PrivacySettings');
    }
    public function securitySettings()
    {
        return Inertia::render('SecuritySettings');
    }
    public function accountSettings()
    {
        return Inertia::render('AccountSettings');
    }
    public function support()
    {
        return Inertia::render('Support');
    }
    public function terms()
    {
        return Inertia::render('Terms');
    }
    public function privacy()
    {
        return Inertia::render('Privacy');
    }
    public function faq()
    {
        return Inertia::render('FAQ');
    }
    public function contact()
    {
        return Inertia::render('Contact');
    }
}
