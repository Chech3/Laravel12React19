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
            $table->string('cedula');
            $table->string('tipo');
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down(): void
    {

        Schema::table('personal_cocinas', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

    }
};
