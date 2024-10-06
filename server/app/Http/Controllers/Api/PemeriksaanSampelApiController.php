<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PemeriksaanSampel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PemeriksaanSampelApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all data from PemeriksaanSampel model
        $pemeriksaan = PemeriksaanSampel::all();

        // Return response as JSON
        return response()->json($pemeriksaan, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate request
        $validatedData = $request->validate([
            'nama_pasien' => 'required|string|max:255',
            'jenis_sampel' => 'required|string|max:255',
            'tanggal_pemeriksaan' => 'required|date',
            'hasil_pemeriksaan' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $pemeriksaan = new PemeriksaanSampel();
        $pemeriksaan->nama_pasien = $validatedData['nama_pasien'];
        $pemeriksaan->jenis_sampel = $validatedData['jenis_sampel'];
        $pemeriksaan->tanggal_pemeriksaan = $validatedData['tanggal_pemeriksaan'];
        $pemeriksaan->hasil_pemeriksaan = $validatedData['hasil_pemeriksaan'];

        // Check if request has file
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $path = $file->store('public/gambar');
            $pemeriksaan->path_gambar = Storage::url($path);
        }

        // Save data to database
        $pemeriksaan->save();

        // Return response as JSON
        return response()->json($pemeriksaan, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Find data by ID
        $pemeriksaan = PemeriksaanSampel::find($id);

        // Check if data not found
        if (!$pemeriksaan) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        // Return response as JSON
        return response()->json($pemeriksaan, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find data by ID
        $pemeriksaan = PemeriksaanSampel::findOrFail($id);

        // Validate request
        $validatedData = $request->validate([
            'nama_pasien' => 'required|string|max:255',
            'jenis_sampel' => 'required|string|max:255',
            'tanggal_pemeriksaan' => 'required|date',
            'hasil_pemeriksaan' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $pemeriksaan->nama_pasien = $validatedData['nama_pasien'];
        $pemeriksaan->jenis_sampel = $validatedData['jenis_sampel'];
        $pemeriksaan->tanggal_pemeriksaan = $validatedData['tanggal_pemeriksaan'];
        $pemeriksaan->hasil_pemeriksaan = $validatedData['hasil_pemeriksaan'];

        // Check if request has file
        if ($request->hasFile('gambar')) {
            // Delete old image if exists
            if ($pemeriksaan->path_gambar) {
                Storage::delete(str_replace('/storage', 'public', $pemeriksaan->path_gambar));
            }

            // Store new image
            $file = $request->file('gambar');
            $path = $file->store('public/gambar');
            $pemeriksaan->path_gambar = Storage::url($path);
        }

        // Save updated data to database
        $pemeriksaan->save();

        // Return response as JSON
        return response()->json($pemeriksaan, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find data by ID
        $pemeriksaan = PemeriksaanSampel::find($id);

        // Check if data not found
        if (!$pemeriksaan) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        // Delete data from database
        $pemeriksaan->delete();

        // Return response as JSON
        return response()->json(['message' => 'Data deleted successfully'], 204);
    }
}
