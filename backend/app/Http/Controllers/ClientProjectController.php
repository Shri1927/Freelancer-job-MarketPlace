<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientProjectController extends Controller
{
    /**
     * LIST PROJECTS (WITH FILTER)
     * /api/client/projects?status=active
     */
    public function index(Request $request)
    {
        $query = Project::with('freelancer')
            ->where('client_id', Auth::id());

        // Optional status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $projects = $query->latest()->get();

        return response()->json($projects);
    }

    /**
     * SINGLE PROJECT VIEW
     * /api/client/projects/{id}
     */
    public function show($id)
    {
        $project = Project::with(['freelancer', 'job', 'files'])
            ->where('client_id', Auth::id())
            ->findOrFail($id);

        return response()->json($project);
    }
}
