<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PemeriksaanSampel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_pasien',
        'jenis_sampel',
        'tanggal_pemeriksaan',
        'hasil_pemeriksaan',
    ];
}
