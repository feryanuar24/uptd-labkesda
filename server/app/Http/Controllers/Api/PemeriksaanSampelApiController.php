<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PemeriksaanSampel;
use Illuminate\Http\Request;

class PemeriksaanSampelApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pemeriksaan = PemeriksaanSampel::all();

        return response()->json($pemeriksaan, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_pasien' => 'required|string|max:255',
            'jenis_sampel' => 'required|string|max:255',
            'tanggal_pemeriksaan' => 'required|date',
            'hasil_pemeriksaan' => 'required|string|max:255',
        ]);

        $pemeriksaan = PemeriksaanSampel::create($validatedData);

        return response()->json($pemeriksaan, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pemeriksaan = PemeriksaanSampel::find($id);

        if (!$pemeriksaan) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($pemeriksaan, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pemeriksaan = PemeriksaanSampel::find($id);

        if (!$pemeriksaan) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        $request->validate([
            'nama_pasien' => 'required|string|max:255',
            'jenis_sampel' => 'required|string|max:255',
            'tanggal_pemeriksaan' => 'required|date',
            'hasil_pemeriksaan' => 'required|string|max:255',
        ]);

        $pemeriksaan->update($request->all());

        return response()->json($pemeriksaan, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pemeriksaan = PemeriksaanSampel::find($id);

        if (!$pemeriksaan) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        $pemeriksaan->delete();

        return response()->json(['message' => 'Data deleted successfully'], 204);
    }
}
