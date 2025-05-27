<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rejected_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('import_id')->constrained('imports');
            $table->string('material_name');
            $table->integer('quantity');
            $table->text('reason');
            $table->enum('action_taken', ['returned', 'destroyed', 'other']);
            $table->foreignId('responsible_employee_id')->constrained('employees');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rejected_materials');
    }
};
