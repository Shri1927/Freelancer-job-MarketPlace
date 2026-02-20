<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientPaymentMethodController extends Controller
{
    /**
     * LIST CLIENT PAYMENT METHODS
     */
    public function index()
    {
        return response()->json(
            PaymentMethod::where('user_id', Auth::id())
                ->orderByDesc('is_default')
                ->latest()
                ->get()
        );
    }

    /**
     * STORE / ADD PAYMENT METHOD
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'nullable|string|max:255',
            'card_number' => 'required|string|min:4',
            'expiry'      => 'nullable|string|max:7',
            'cvv'         => 'nullable|string',
        ]);

        $brand = null;
        $number = preg_replace('/\D/', '', $data['card_number']);

        if (str_starts_with($number, '4')) {
            $brand = 'Visa';
        } elseif (str_starts_with($number, '5')) {
            $brand = 'Mastercard';
        } else {
            $brand = 'Card';
        }

        // First method becomes default by default
        $hasMethods = PaymentMethod::where('user_id', Auth::id())->exists();

        $paymentMethod = PaymentMethod::create([
            'user_id'    => Auth::id(),
            'name'       => $data['name'] ?? null,
            'brand'      => $brand,
            'last4'      => substr($number, -4),
            'expiry'     => $data['expiry'] ?? null,
            'is_default' => !$hasMethods,
        ]);

        return response()->json([
            'message'        => 'Payment method saved',
            'paymentMethod'  => $paymentMethod,
        ], 201);
    }
}


