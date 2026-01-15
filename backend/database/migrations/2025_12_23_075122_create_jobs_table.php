<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    // Use 'job_posts' to avoid conflicting with Laravel's queue 'jobs' table
    Schema::create('job_posts', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // client

        $table->string('title');
        $table->text('description');

        $table->string('budget');           // "$2000 - $3500"
        $table->string('duration');         // "1-2 months"
        $table->string('category')->nullable();
        $table->string('experience_level')->nullable();

        $table->enum('status', [
    'open',
    'assigned',
    'completed',
    'closed'
])->default('open');

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};


