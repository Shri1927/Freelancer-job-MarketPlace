<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ActivityLogger;
use App\Models\Invoice;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    /**
     * CLIENT → Make Payment (manual for now)
     */
    public function pay(Request $request, $projectId)
    {
        $project = Project::where('client_id', Auth::id())
            ->findOrFail($projectId);

        $request->validate([
            'amount' => 'required|numeric|min:1'
        ]);

        // 1️⃣ Create payment
        $payment = Payment::create([
            'project_id'     => $project->id,
            'client_id'      => Auth::id(),
            'freelancer_id'  => $project->freelancer_id,
            'amount'         => $request->amount,
            'currency'       => 'INR',
            'status'         => 'paid',
            'payment_method' => 'manual',
            'transaction_id' => uniqid('txn_')
        ]);

        // 2️⃣ Create invoice immediately
        $invoice = Invoice::create([
            'invoice_number' => 'INV-' . strtoupper(Str::random(8)),
            'project_id'     => $project->id,
            'client_id'      => $project->client_id,
            'freelancer_id'  => $project->freelancer_id,
            'amount'         => $payment->amount,
            'status'         => 'paid',
            'invoice_date'   => now()
        ]);

        // 3️⃣ Update project status (recommended)
        $project->update([
            'status' => 'completed'
        ]);

        // 4️⃣ Activity log
        ActivityLogger::log(
            Auth::id(),
            'payment_made',
            'Payment successful',
            '₹' . $request->amount . ' paid for project',
            $payment
        );

        return response()->json([
            'message' => 'Payment successful',
            'payment' => $payment,
            'invoice' => $invoice
        ], 201);
    }

    /**
     * CLIENT → Payment history
     */
    public function clientPayments()
    {
        return response()->json(
            Payment::with('project')
                ->where('client_id', Auth::id())
                ->latest()
                ->get()
        );
    }

    /**
     * FREELANCER → All earnings
     */
    public function freelancerPayments()
    {
        return response()->json(
            Payment::with('project')
                ->where('freelancer_id', Auth::id())
                ->where('status', 'paid')
                ->latest()
                ->get()
        );
    }

    /**
     * FREELANCER → Total earnings
     */
    public function totalEarnings()
    {
        return response()->json([
            'total' => Payment::where('freelancer_id', Auth::id())
                ->where('status', 'paid')
                ->sum('amount')
        ]);
    }
}
