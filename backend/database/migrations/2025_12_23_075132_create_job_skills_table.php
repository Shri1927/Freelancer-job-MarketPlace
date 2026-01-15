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
    Schema::create('job_skills', function (Blueprint $table) {
        $table->id();
        // reference the new 'job_posts' table
        $table->foreignId('job_id')->constrained('job_posts')->onDelete('cascade');
        $table->string('skill');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_skills');
    }
};
