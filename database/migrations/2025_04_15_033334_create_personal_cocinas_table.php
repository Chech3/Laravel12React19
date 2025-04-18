<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('personal_cocinas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('rol')->nullable(); // Ejemplo: "Chef", "Ayudante"
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('personal_cocinas');
    }
};
