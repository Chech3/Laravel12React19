<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Horario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocenteController extends Controller
{

    public function index()
    {
        $docentes = Docente::with('horario')->get();

        $horarios = Horario::all();
        // $docentes = Docente::all();
        return Inertia::render('Docentes/Index', [
            'docentes' => $docentes,
            'horarios' => $horarios,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|max:255|unique:docentes,correo',
        ]);

        Docente::create($request->all());
        
        return redirect()->route('docente.index')
            ->with('flash', [
                'message' => 'Docente registrado con éxito.',
                'success' => true
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Docente $docente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Docente $docente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Docente $docente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Docente $docente)
    {
        $docente->delete();

        return redirect()->route('docente.index')->with('success', 'Docente eliminado con éxito.');
    }
}
