<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobSkill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class JobController extends Controller
{
    // FIND / SEARCH JOBS
    public function index(Request $request)
    {
        $query = Job::with('skills')
            ->where('status', 'open');

        if ($request->filled('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->q . '%')
                  ->orWhere('description', 'like', '%' . $request->q . '%');
            });
        }

        if ($request->filled('category')) {
            $query->where('category', 'like', '%' . $request->category . '%');
        }

        if ($request->filled('experience_level')) {
            $query->where('experience_level', $request->experience_level);
        }

        if ($request->filled('skill')) {
            $query->whereHas('skills', function ($q) use ($request) {
                $q->where('skill', 'like', '%' . $request->skill . '%');
            });
        }

        return response()->json(
            $query->latest()->paginate(10)
        );
    }

    // JOB DETAILS
    public function show($id)
    {
        $job = Job::with('skills', 'user')
            ->where('status', 'open')
            ->findOrFail($id);

        return response()->json($job);
    }

    // POST JOB (CLIENT ONLY)
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'client') {
            return response()->json([
                'message' => 'Only clients can post jobs'
            ], 403);
        }

        $data = $request->validate([
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'skills'           => 'nullable|array',
            'skills.*'         => 'string',
            'budget'           => 'required|string',
            'duration'         => 'required|string',
            'category'         => 'nullable|string',
            'experience_level' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $job = Job::create([
                'user_id'          => Auth::id(),
                'title'            => $data['title'],
                'description'      => $data['description'],
                'budget'           => $data['budget'],
                'duration'         => $data['duration'],
                'category'         => $data['category'] ?? null,
                'experience_level' => $data['experience_level'] ?? null,
            ]);

            if (!empty($data['skills'])) {
                foreach ($data['skills'] as $skill) {
                    JobSkill::create([
                        'job_id' => $job->id,
                        'skill'  => trim(strtolower($skill)),
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Job posted successfully',
                'job' => $job->load('skills')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to post job'
            ], 500);
        }
    }
}
