<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Secciones extends Model
{
    use HasFactory;


    protected $fillable = [
        'nombre',
        'grado_id',
        'docente_id',
    ];
    public function grado()
    {
        return $this->belongsTo(Grado::class);
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class);
    }

    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class);
    }
}
