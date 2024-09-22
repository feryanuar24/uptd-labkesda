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
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $pemeriksaan = new PemeriksaanSampel();
        $pemeriksaan->nama_pasien = $validatedData['nama_pasien'];
        $pemeriksaan->jenis_sampel = $validatedData['jenis_sampel'];
        $pemeriksaan->tanggal_pemeriksaan = $validatedData['tanggal_pemeriksaan'];
        $pemeriksaan->hasil_pemeriksaan = $validatedData['hasil_pemeriksaan'];

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $path = $file->store('public/gambar');
            $pemeriksaan->path_gambar = Storage::url($path);
        }

        $pemeriksaan->save();

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
        $request->validate([
            'nama_pasien' => 'required|string|max:255',
            'jenis_sampel' => 'required|string|max:255',
            'tanggal_pemeriksaan' => 'required|date',
            'hasil_pemeriksaan' => 'required|string|max:255',
            'gambar' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $pemeriksaan = PemeriksaanSampel::findOrFail($id);
        $pemeriksaan->nama_pasien = $request->input('nama_pasien');
        $pemeriksaan->jenis_sampel = $request->input('jenis_sampel');
        $pemeriksaan->tanggal_pemeriksaan = $request->input('tanggal_pemeriksaan');
        $pemeriksaan->hasil_pemeriksaan = $request->input('hasil_pemeriksaan');

        if ($request->hasFile('gambar')) {
            if ($pemeriksaan->path_gambar) {
                Storage::delete('public/' . $pemeriksaan->path_gambar);
            }

            $file = $request->file('gambar');
            $path = $file->store('public/gambar');
            $pemeriksaan->path_gambar = Storage::url($path);
        }

        $pemeriksaan->save();

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
