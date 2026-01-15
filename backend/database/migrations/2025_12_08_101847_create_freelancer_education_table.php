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
        Schema::create('freelancer_education', function (Blueprint $table) {
            $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');

        $table->string('school');
        $table->string('degree')->nullable();
        $table->string('field_of_study')->nullable();

        $table->integer('start_year')->nullable();
        $table->integer('end_year')->nullable();

        $table->text('description')->nullable();

        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancer_education');
    }
};
