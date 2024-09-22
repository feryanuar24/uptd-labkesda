import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateSampel = () => {
  const navigate = useNavigate();

  const [namaPasien, setNamaPasien] = useState("");
  const [jenisSampel, setJenisSampel] = useState("");
  const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState("");
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState("");
  const [gambar, setGambar] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (
      !namaPasien ||
      !jenisSampel ||
      !tanggalPemeriksaan ||
      !hasilPemeriksaan
    ) {
      setProcessing(false);
      alert("Kolom selain gambar tidak boleh kosong");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("nama_pasien", namaPasien);
    formData.append("jenis_sampel", jenisSampel);
    formData.append("tanggal_pemeriksaan", tanggalPemeriksaan);
    formData.append("hasil_pemeriksaan", hasilPemeriksaan);
    if (gambar) {
      formData.append("gambar", gambar);
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/pemeriksaan-sampels",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        return;
      }

      setNamaPasien("");
      setJenisSampel("");
      setTanggalPemeriksaan("");
      setHasilPemeriksaan("");
      setGambar(null);

      alert("Data sampel berhasil ditambahkan");
      navigate("/");
    } catch (error) {
      console.error("Gagal menambahkan data sampel", error);
      alert("Gagal menambahkan data sampel");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-slate-100 w-full h-[700px] p-10 text-slate-800">
      <div className="w-full bg-white rounded-xl p-5">
        <h6 className="card-title font-bold text-xl">Tambah Data Sampel</h6>
        <div className="mt-7 pt-0.5">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="sm:col-span-3">
                <label
                  htmlFor="nama-pasien"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Pasien
                </label>
                <div className="mt-2">
                  <input
                    id="nama-pasien"
                    name="nama-pasien"
                    type="text"
                    autoComplete="given-name"
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setNamaPasien(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="jenis-sampel"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Jenis Sampel
                </label>
                <div className="mt-2">
                  <select
                    id="jenis-sampel"
                    name="jenis-sampel"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => setJenisSampel(e.target.value)}
                    defaultValue="Pilih Opsi"
                  >
                    <option disabled value="Pilih Opsi">
                      Pilih Opsi
                    </option>
                    <option value="Darah">Darah</option>
                    <option value="Urin">Urin</option>
                    <option value="Sputum">Sputum</option>
                    <option value="Swab Nasofaring">Swab Nasofaring</option>
                  </select>
                </div>
              </div>
              <div className="col-span-full xl:col-auto leading-none flex flex-col space-y-3">
                <label
                  htmlFor="tanggal-pemeriksaan"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tanggal Pemeriksaan
                </label>
                <input
                  className="mt-2 p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="date"
                  name="tanggal-pemeriksaan"
                  id="tanggal-pemeriksaan"
                  onChange={(e) => setTanggalPemeriksaan(e.target.value)}
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="hasil-pemeriksaan"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Hasil Pemeriksaan
                </label>
                <div className="mt-2">
                  <textarea
                    id="hasil-pemeriksaan"
                    name="hasil-pemeriksaan"
                    rows={3}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) => setHasilPemeriksaan(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="gambar"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gambar
                </label>
                <input
                  type="file"
                  id="gambar"
                  name="gambar"
                  accept="image/*"
                  onChange={(e) => setGambar(e.target.files[0])}
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="space-x-3 flex">
                <Link to={"/"}>
                  <button className="bg-slate-500 rounded-lg px-3 py-1 text-white hover:bg-slate-800 transition-colors duration-300 ease-in-out">
                    Batal
                  </button>
                </Link>
                {processing ? (
                  <button
                    type="button"
                    className="flex items-center bg-indigo-500 rounded-lg px-5 py-1 text-white hover:bg-indigo-800 transition-colors duration-300 ease-in-out"
                    disabled
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-indigo-500 rounded-lg px-3 py-1 text-white hover:bg-indigo-800 transition-colors duration-300 ease-in-out"
                  >
                    Simpan
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSampel;
