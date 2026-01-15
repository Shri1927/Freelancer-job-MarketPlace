<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Helpers\ActivityLogger;

class ProjectFileController extends Controller
{
    /**
     * Upload file to project
     */
    public function upload(Request $request, $projectId)
    {
        $project = Project::where(function ($q) {
            $q->where('client_id', Auth::id())
              ->orWhere('freelancer_id', Auth::id());
        })->findOrFail($projectId);

        $request->validate([
            'file' => 'required|file|max:10240' // 10MB
        ]);

        $file = $request->file('file');

        $path = $file->store('project_files');

        $record = ProjectFile::create([
            'project_id'    => $project->id,
            'uploaded_by'   => Auth::id(),
            'original_name' => $file->getClientOriginalName(),
            'file_path'     => $path,
            'file_type'     => $file->getClientMimeType(),
            'file_size'     => $file->getSize()
        ]);

        

        ActivityLogger::log(
    $project->client_id == Auth::id() 
        ? $project->freelancer_id 
        : $project->client_id,
    'file_uploaded',
    'File uploaded',
    $file->getClientOriginalName(),
    $record
);
return response()->json([
            'message' => 'File uploaded successfully',
            'file' => $record
        ], 201);

    }

    /**
     * List files for a project
     */
    public function list($projectId)
    {
        $project = Project::where(function ($q) {
            $q->where('client_id', Auth::id())
              ->orWhere('freelancer_id', Auth::id());
        })->findOrFail($projectId);

        return response()->json(
            $project->files()->latest()->get()
        );
    }

    /**
     * Download file
     */
    public function download($id)
    {
        $file = ProjectFile::findOrFail($id);

        // access check
        $project = Project::where(function ($q) {
            $q->where('client_id', Auth::id())
              ->orWhere('freelancer_id', Auth::id());
        })->findOrFail($file->project_id);

        return Storage::download($file->file_path, $file->original_name);
    }
}
