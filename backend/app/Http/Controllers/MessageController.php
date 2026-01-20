<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ActivityLogger;

class MessageController extends Controller
{
    /**
     * Get or create conversation for a project
     */
    private function getConversation($projectId)
    {
        $project = Project::find($projectId);
        
        if (!$project) {
            abort(404, 'Project not found');
        }

        // Verify user has access to this project
        $userId = Auth::id();
        if ($project->client_id !== $userId && $project->freelancer_id !== $userId) {
            abort(403, 'You do not have access to this project');
        }

        return Conversation::firstOrCreate([
            'project_id' => $project->id,
            'client_id' => $project->client_id,
            'freelancer_id' => $project->freelancer_id
        ]);
    }

    /**
     * SEND MESSAGE
     */
    public function send(Request $request)
    {
        $data = $request->validate([
            'project_id' => 'required|integer',
            'message'    => 'required|string'
        ]);

        $conversation = $this->getConversation($data['project_id']);

        $msg = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => Auth::id(),
            'message' => $data['message']
        ]);

       
        ActivityLogger::log(
    Auth::id(),
    'message_sent',
    'Message sent',
    $data['message'],
    $conversation
);

 return response()->json($msg, 201);

    }

    /**
     * GET MESSAGES FOR A PROJECT
     */
    public function messages($projectId)
    {
        $conversation = $this->getConversation($projectId);

        // mark messages as read (except sender)
        Message::where('conversation_id', $conversation->id)
            ->where('sender_id', '!=', Auth::id())
            ->update(['is_read' => true]);

        return response()->json(
            $conversation->messages()->latest()->get()
        );
    }

    /**
     * UNREAD MESSAGE COUNT (dashboard)
     */
    public function unreadCount()
    {
        $count = Message::whereHas('conversation', function ($q) {
                $q->where('client_id', Auth::id())
                  ->orWhere('freelancer_id', Auth::id());
            })
            ->where('sender_id', '!=', Auth::id())
            ->where('is_read', false)
            ->count();

        return response()->json(['unread_messages' => $count]);
    }
}
