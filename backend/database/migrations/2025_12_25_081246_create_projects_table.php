<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('job_id')->constrained('job_posts')->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('freelancer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('proposal_id')->constrained('proposals')->onDelete('cascade');
            
            $table->string('title');
            $table->text('description');
            $table->decimal('amount', 10, 2);
            
            $table->enum('status', [
                'active',
                'completed',
                'cancelled',
                'in_review'
            ])->default('active');
            
            $table->integer('progress')->default(0);
            $table->date('deadline')->nullable();
            
            $table->timestamps();
            
            // One proposal can only have one project
            $table->unique('proposal_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};