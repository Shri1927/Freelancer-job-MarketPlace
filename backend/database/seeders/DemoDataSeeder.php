<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Job;
use App\Models\Proposal;
use App\Models\Project;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create demo client
        $client = User::firstOrCreate(
            ['email' => 'client@demo.com'],
            [
                'name' => 'John Client',
                'password' => Hash::make('password123'),
                'role' => 'client',
                'email_verified_at' => now(),
            ]
        );

        // Create demo freelancer
        $freelancer = User::firstOrCreate(
            ['email' => 'freelancer@demo.com'],
            [
                'name' => 'Sarah Freelancer',
                'password' => Hash::make('password123'),
                'role' => 'freelancer',
                'email_verified_at' => now(),
            ]
        );

        // Create another demo freelancer
        $freelancer2 = User::firstOrCreate(
            ['email' => 'freelancer2@demo.com'],
            [
                'name' => 'Mike Developer',
                'password' => Hash::make('password123'),
                'role' => 'freelancer',
                'email_verified_at' => now(),
            ]
        );

        // Create demo jobs
        $job1 = Job::firstOrCreate(
            ['title' => 'Build a Modern E-commerce Website'],
            [
                'user_id' => $client->id,
                'description' => 'Looking for an experienced web developer to build a modern e-commerce website with React and Laravel. Must have experience with payment integration.',
                'budget' => '₹50,000',
                'duration' => '2 months',
                'category' => 'Web Development',
                'experience_level' => 'Expert',
                'status' => 'open',
            ]
        );

        $job2 = Job::firstOrCreate(
            ['title' => 'Mobile App UI/UX Design'],
            [
                'user_id' => $client->id,
                'description' => 'Need a creative designer to create beautiful UI/UX designs for our mobile app.',
                'budget' => '₹25,000',
                'duration' => '1 month',
                'category' => 'Design',
                'experience_level' => 'Intermediate',
                'status' => 'open',
            ]
        );

        // Create proposals
        $proposal1 = Proposal::firstOrCreate(
            [
                'job_id' => $job1->id,
                'freelancer_id' => $freelancer->id,
            ],
            [
                'cover_letter' => 'I have 5+ years of experience building e-commerce websites with React and Laravel. I would love to work on your project!',
                'bid_amount' => 48000,
                'delivery_time' => '45 days',
                'status' => 'accepted',
            ]
        );

        $proposal2 = Proposal::firstOrCreate(
            [
                'job_id' => $job2->id,
                'freelancer_id' => $freelancer2->id,
            ],
            [
                'cover_letter' => 'I am a UI/UX designer with expertise in mobile app design. Check out my portfolio!',
                'bid_amount' => 24000,
                'delivery_time' => '21 days',
                'status' => 'accepted',
            ]
        );

        // Create projects from accepted proposals
        $project1 = Project::firstOrCreate(
            [
                'job_id' => $job1->id,
                'proposal_id' => $proposal1->id,
            ],
            [
                'client_id' => $client->id,
                'freelancer_id' => $freelancer->id,
                'title' => $job1->title,
                'description' => $job1->description,
                'amount' => $proposal1->bid_amount,
                'deadline' => now()->addMonths(2)->format('Y-m-d'),
                'status' => 'active',
                'progress' => 25,
            ]
        );

        $project2 = Project::firstOrCreate(
            [
                'job_id' => $job2->id,
                'proposal_id' => $proposal2->id,
            ],
            [
                'client_id' => $client->id,
                'freelancer_id' => $freelancer2->id,
                'title' => $job2->title,
                'description' => $job2->description,
                'amount' => $proposal2->bid_amount,
                'deadline' => now()->addMonth()->format('Y-m-d'),
                'status' => 'active',
                'progress' => 40,
            ]
        );

        // Create conversations
        $conversation1 = Conversation::firstOrCreate(
            [
                'project_id' => $project1->id,
            ],
            [
                'client_id' => $client->id,
                'freelancer_id' => $freelancer->id,
            ]
        );

        $conversation2 = Conversation::firstOrCreate(
            [
                'project_id' => $project2->id,
            ],
            [
                'client_id' => $client->id,
                'freelancer_id' => $freelancer2->id,
            ]
        );

        // Create sample messages for conversation 1
        $messages1 = [
            [
                'sender_id' => $client->id,
                'message' => 'Hi Sarah! Excited to work with you on this project. When can we start?',
                'created_at' => now()->subDays(2),
            ],
            [
                'sender_id' => $freelancer->id,
                'message' => 'Hello John! Thank you for accepting my proposal. I can start immediately. Let me share my initial thoughts.',
                'created_at' => now()->subDays(2)->addHours(1),
            ],
            [
                'sender_id' => $freelancer->id,
                'message' => 'I have reviewed your requirements in detail. I suggest we start with the user authentication module and then move to the product catalog.',
                'created_at' => now()->subDays(2)->addHours(2),
            ],
            [
                'sender_id' => $client->id,
                'message' => 'Sounds great! Please proceed with that approach. Do you need any additional resources from my side?',
                'created_at' => now()->subDays(1),
            ],
            [
                'sender_id' => $freelancer->id,
                'message' => 'I will need access to your logo files and brand guidelines. Also, please share the product catalog data if you have it ready.',
                'created_at' => now()->subDays(1)->addHours(3),
            ],
            [
                'sender_id' => $client->id,
                'message' => 'I will send those files by end of day. Looking forward to seeing the progress!',
                'created_at' => now()->subHours(12),
            ],
        ];

        foreach ($messages1 as $msgData) {
            Message::firstOrCreate(
                [
                    'conversation_id' => $conversation1->id,
                    'sender_id' => $msgData['sender_id'],
                    'message' => $msgData['message'],
                ],
                [
                    'is_read' => true,
                    'created_at' => $msgData['created_at'],
                    'updated_at' => $msgData['created_at'],
                ]
            );
        }

        // Create sample messages for conversation 2
        $messages2 = [
            [
                'sender_id' => $client->id,
                'message' => 'Hi Mike! Welcome to the project. Can you share your design process?',
                'created_at' => now()->subDays(3),
            ],
            [
                'sender_id' => $freelancer2->id,
                'message' => 'Hi John! Of course. I will start with user research, then create wireframes, followed by high-fidelity mockups.',
                'created_at' => now()->subDays(3)->addHours(2),
            ],
            [
                'sender_id' => $client->id,
                'message' => 'Perfect! How long will each phase take?',
                'created_at' => now()->subDays(2),
            ],
            [
                'sender_id' => $freelancer2->id,
                'message' => 'Research: 3 days, Wireframes: 5 days, High-fidelity designs: 7 days. I have already completed the research phase!',
                'created_at' => now()->subDays(2)->addHours(4),
            ],
        ];

        foreach ($messages2 as $msgData) {
            Message::firstOrCreate(
                [
                    'conversation_id' => $conversation2->id,
                    'sender_id' => $msgData['sender_id'],
                    'message' => $msgData['message'],
                ],
                [
                    'is_read' => true,
                    'created_at' => $msgData['created_at'],
                    'updated_at' => $msgData['created_at'],
                ]
            );
        }

        $this->command->info('Demo data seeded successfully!');
        $this->command->info('');
        $this->command->info('Demo Users Created:');
        $this->command->info('Client: client@demo.com / password123');
        $this->command->info('Freelancer 1: freelancer@demo.com / password123');
        $this->command->info('Freelancer 2: freelancer2@demo.com / password123');
        $this->command->info('');
        $this->command->info('Projects: ' . Project::count());
        $this->command->info('Messages: ' . Message::count());
    }
}
