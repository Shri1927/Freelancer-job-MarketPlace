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
    Schema::create('proposals', function (Blueprint $table) {
        $table->id();

        // reference the application table `job_posts` instead of Laravel's queue `jobs`
        $table->foreignId('job_id')->constrained('job_posts')->onDelete('cascade');
        $table->foreignId('freelancer_id')
              ->constrained('users')
              ->onDelete('cascade');

        $table->text('cover_letter');
        $table->decimal('bid_amount', 10, 2);
        $table->string('delivery_time');

        $table->enum('status', [
    'open',
    'accepted',
    'rejected'
])->default('open');

        $table->timestamps();

        // one freelancer → one proposal per job
        $table->unique(['job_id', 'freelancer_id']);
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
