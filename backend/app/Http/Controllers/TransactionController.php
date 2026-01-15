<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Withdrawal;

class TransactionController extends Controller
{
    public function index()
    {
        $payments = Payment::where('freelancer_id', auth()->id())
            ->where('status', 'paid')
            ->get()
            ->map(fn ($p) => [
                'date' => $p->created_at->format('m/d/Y'),
                'description' => 'Project Payment',
                'type' => 'earning',
                'amount' => '+' . $p->amount,
                'status' => 'completed'
            ]);

        $withdrawals = Withdrawal::where('freelancer_id', auth()->id())
            ->get()
            ->map(fn ($w) => [
                'date' => $w->created_at->format('m/d/Y'),
                'description' => ucfirst($w->method) . ' Withdrawal',
                'type' => 'withdrawal',
                'amount' => '-' . $w->amount,
                'status' => $w->status
            ]);

        return $payments->merge($withdrawals)->sortByDesc('date')->values();
    }

    public function summary()
    {
        $earnings = Payment::where('freelancer_id', auth()->id())
            ->where('status', 'paid')
            ->sum('amount');

        $withdrawals = Withdrawal::where('freelancer_id', auth()->id())
            ->where('status', 'completed')
            ->sum('amount');

        return [
            'total_earnings' => $earnings,
            'total_withdrawals' => $withdrawals,
            'available_balance' => $earnings - $withdrawals
        ];
    }
}
