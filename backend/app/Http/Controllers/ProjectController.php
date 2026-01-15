<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ActivityLogger;

class ProjectController extends Controller
{
    /**
     * CLIENT → All projects posted by client
     */
    public function clientProjects()
    {
        $projects = Project::with(['freelancer', 'job'])
            ->where('client_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($projects);
    }

    /**
     * FREELANCER → Assigned projects
     */
    public function freelancerProjects()
    {
        $projects = Project::with(['client', 'job'])
            ->where('freelancer_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($projects);
    }

    /**
     * SINGLE PROJECT DETAILS
     */
    public function show($id)
    {
        $project = Project::with(['client', 'freelancer', 'job'])
            ->where(function ($q) {
                $q->where('client_id', Auth::id())
                  ->orWhere('freelancer_id', Auth::id());
            })
            ->findOrFail($id);

        return response()->json($project);
    }

    /**
     * UPDATE PROJECT STATUS (client only)
     * active | completed | on_hold
     */
    public function updateStatus($id)
    {
        $project = Project::where('client_id', Auth::id())->findOrFail($id);

        request()->validate([
            'status' => 'required|in:active,completed,cancelled'
        ]);

        $project->update([
            'status' => request('status')
        ]);

        

        if (request('status') === 'completed') {
    ActivityLogger::log(
        $project->freelancer_id,
        'project_completed',
        'Project completed',
        'Client marked project as completed',
        $project
    );
}
return response()->json([
            'message' => 'Project status updated',
            'project' => $project
        ]);
    }

    /**
     * UPDATE PROJECT PROGRESS (freelancer)
     */
    public function updateProgress($id)
    {
        $project = Project::where('freelancer_id', Auth::id())->findOrFail($id);

        request()->validate([
            'progress' => 'required|integer|min:0|max:100'
        ]);

        $project->update([
            'progress' => request('progress')
        ]);

        return response()->json([
            'message' => 'Progress updated',
            'project' => $project
        ]);
    }
}
