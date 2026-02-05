<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Invoice;
use App\Models\Project;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{
    /**
     * CLIENT → LIST INVOICES
     */
    public function index()
    {
        $invoices = Invoice::with(['project', 'freelancer'])
            ->where('client_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($invoices);
    }

    /**
     * CLIENT → SINGLE INVOICE
     */
    public function show($id)
    {
        $invoice = Invoice::with(['project', 'freelancer'])
            ->where('client_id', Auth::id())
            ->findOrFail($id);

        return response()->json($invoice);
    }

    /**
     * CREATE INVOICE (internal use)
     * Called when payment is completed
     */
    public function createFromProject(Project $project)
    {
        return Invoice::create([
            'invoice_number' => 'INV-' . strtoupper(Str::random(8)),
            'project_id'     => $project->id,
            'client_id'      => $project->client_id,
            'freelancer_id'  => $project->freelancer_id,
            'amount'         => $project->amount,
            'status'         => 'paid',
            'invoice_date'   => now()
        ]);
    }
}
