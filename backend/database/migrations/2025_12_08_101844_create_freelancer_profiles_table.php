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
        Schema::create('freelancer_profiles', function (Blueprint $table) {
            $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');

    $table->string('goal')->nullable();
    $table->string('experience_level')->nullable();
    $table->string('work_preference')->nullable();
    $table->boolean('open_to_contract')->default(false);
    $table->string('work_style')->nullable();
    $table->string('professional_title')->nullable();

    $table->text('bio')->nullable();

    $table->integer('hourly_rate')->nullable();
    $table->integer('service_fee')->nullable();
    $table->integer('earnings_after_fee')->nullable();

    $table->date('date_of_birth')->nullable();
    $table->string('country')->nullable();
    $table->string('street_address')->nullable();
    $table->string('city')->nullable();
    $table->string('state')->nullable();
    $table->string('postal_code')->nullable();
    $table->string('phone')->nullable();

    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancer_profiles');
    }
};
