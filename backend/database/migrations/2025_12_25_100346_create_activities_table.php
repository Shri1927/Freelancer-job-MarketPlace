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
        Schema::create('activities', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
    // who should see this activity

    $table->string('type'); 
    // proposal_created | proposal_accepted | message_sent | file_uploaded | project_completed

    $table->string('title');
    $table->text('description')->nullable();

    $table->nullableMorphs('subject'); 
    // polymorphic: project / job / proposal / message / file

    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
