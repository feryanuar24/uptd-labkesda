<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthApiController extends Controller
{
    public function register(Request $request)
    {
        // Validate request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Check if user already exists but email is not verified
        $user = User::where('email', $request->email)->first();
        if ($user && !$user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();

            return response()->json([
                'message' => 'Account already exists but email is not verified. Verification email has been resent.'
            ]);
        }

        // Create user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Send email verification notification
        $user->sendEmailVerificationNotification();

        // Return response
        return response()->json([
            'message' => 'Register success, please verify your email',
        ], 201);
    }

    public function login(Request $request)
    {
        // Validate request
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Check user
        $user = User::where('email', $validatedData['email'])->first();

        // Throw message if email not found
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['The provided email does not exist.'],
            ]);
        }

        // Check password
        if (!Hash::check($validatedData['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Check email verification
        if (is_null($user->email_verified_at)) {
            return response()->json([
                'message' => 'Please register and verify your email first',
            ], 403);
        }

        // Check remember_token
        $remember_token = $request->has('remember_token') ? true : false;

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response
        if (Auth::attempt($validatedData, $remember_token)) {
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ], 200);
        }
    }

    public function logout(Request $request)
    {
        // Revoke token
        $request->user()->tokens()->delete();

        // Invalidate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Return response
        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function user(Request $request)
    {
        // Return user
        return response()->json($request->user());
    }

    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid verification link.'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified.'], 400);
        }

        $user->markEmailAsVerified();

        return response()->json(['message' => 'Email successfully verified.']);
    }
}
