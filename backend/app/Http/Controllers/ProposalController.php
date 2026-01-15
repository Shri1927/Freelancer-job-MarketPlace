<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Project;
use App\Helpers\ActivityLogger;

class ProposalController extends Controller
{
   
public function apply(Request $request, $jobId)
{
    try {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        if ($user->role !== 'freelancer') {
            return response()->json([
                'message' => 'Only freelancers can apply to jobs'
            ], 403);
        }

        $data = $request->validate([
            'cover_letter' => 'required|string',
            'bid_amount'   => 'required|numeric|min:0',
            'delivery_time'=> 'required|string',
        ]);

        // Check if job exists
        $job = Job::find($jobId);
        
        if (!$job) {
            return response()->json([
                'message' => 'Job not found'
            ], 404);
        }

        if ($job->status !== 'open') {
            return response()->json([
                'message' => 'Job is not open for proposals'
            ], 400);
        }

        // prevent duplicate proposal
        $existingProposal = Proposal::where('job_id', $jobId)
            ->where('freelancer_id', $user->id)
            ->first();
            
        if ($existingProposal) {
            return response()->json([
                'message' => 'You already applied to this job'
            ], 409);
        }

        $proposal = Proposal::create([
            'job_id'        => (int)$jobId,
            'freelancer_id' => $user->id,
            'cover_letter'  => $data['cover_letter'],
            'bid_amount'    => $data['bid_amount'],
            'delivery_time' => $data['delivery_time'],
        ]);
        
        ActivityLogger::log(
            $job->user_id, // CLIENT sees this
            'proposal_created',
            'New proposal received',
            'A freelancer applied to your job',
            $proposal
        );

        return response()->json([
            'message' => 'Proposal submitted successfully',
            'proposal' => $proposal
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error creating proposal',
            'error' => $e->getMessage()
        ], 500);
    }
}


    // Client views proposals for a job
    public function listForJob($jobId)
    {
        $job = Job::where('user_id', Auth::id())
                  ->findOrFail($jobId);

        $proposals = Proposal::with('freelancer')
            ->where('job_id', $jobId)
            ->latest()
            ->get();

        return response()->json($proposals);
    }

 public function accept($id)
{
    $project = DB::transaction(function () use ($id) {

        $proposal = Proposal::with('job')
            ->whereHas('job', function ($q) {
                $q->where('user_id', Auth::id());
            })
            ->lockForUpdate()
            ->findOrFail($id);

        if ($proposal->status === 'accepted') {
            throw new \Exception('Proposal already accepted');
        }

        // accept proposal
        $proposal->update([
            'status' => 'accepted'
        ]);

        // reject other proposals
        Proposal::where('job_id', $proposal->job_id)
            ->where('id', '!=', $proposal->id)
            ->update([
                'status' => 'rejected'
            ]);

        // update job (must be valid ENUM)
        $proposal->job->update([
            'status' => 'assigned'
        ]);

        // create project
        return Project::firstOrCreate(
            ['proposal_id' => $proposal->id],
            [
                'job_id'        => $proposal->job_id,
                'client_id'     => $proposal->job->user_id,
                'freelancer_id' => $proposal->freelancer_id,
                'title'         => $proposal->job->title,
                'description'   => $proposal->job->description,
                'amount'        => $proposal->bid_amount,
                'status'        => 'active',
            ]
        );
    });

   

    ActivityLogger::log(
    $proposal->freelancer_id,
    'proposal_accepted',
    'Your proposal was accepted',
    'Project has been created',
    $project
);

ActivityLogger::log(
    $proposal->job->user_id,
    'project_created',
    'Project started',
    'You accepted a proposal',
    $project
);

 // ✅ response MUST be returned OUTSIDE the transaction
    return response()->json([
        'message' => 'Proposal accepted and project created successfully',
        'project' => $project
    ], 200);
}

}
