<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Withdrawal;


class WithdrawalController extends Controller
{
    public function withdraw(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'method' => 'required|in:bank,paypal,wallet'
        ]);

        $totalEarnings = Payment::where('freelancer_id', auth()->id())
            ->where('status', 'paid')
            ->sum('amount');

        $totalWithdrawn = Withdrawal::where('freelancer_id', auth()->id())
            ->where('status', 'completed')
            ->sum('amount');

        $availableBalance = $totalEarnings - $totalWithdrawn;

        if ($request->amount > $availableBalance) {
            return response()->json(['message' => 'Insufficient balance'], 422);
        }

        switch ($request->method) {
            case 'bank':
                $feePercent = 2;
                break;
            case 'paypal':
                $feePercent = 3;
                break;
            case 'wallet':
                $feePercent = 1.5;
                break;
            default:
                $feePercent = 0;
        }

        $fee = ($request->amount * $feePercent) / 100;

        return Withdrawal::create([
            'freelancer_id' => auth()->id(),
            'amount' => $request->amount,
            'method' => $request->method,
            'fee' => $fee,
            'status' => 'pending',
            'reference_id' => uniqid('wd_')
        ]);
    }

    public function history()
    {
        return Withdrawal::where('freelancer_id', auth()->id())
            ->latest()
            ->get();
    }
}
