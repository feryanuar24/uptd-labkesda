import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSampel, updateSampel } from "../../api";
import Button from "../../components/UI/Button";

const EditSampel = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [sampel, setSampel] = useState({
    nama_pasien: "",
    jenis_sampel: "",
    tanggal_pemeriksaan: "",
    hasil_pemeriksaan: "",
    path_gambar: "",
    gambar: null,
  });

  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSampel = async () => {
      try {
        const response = await getSampel(id);
        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          navigate("/");
        }

        setSampel(data);
      } catch (error) {
        alert("Terjadi kesalahan");
        console.error("An error occurred", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSampel();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "gambar") {
      setSampel((prevState) => ({
        ...prevState,
        [id]: files[0],
      }));
    } else {
      setSampel((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (
      !sampel.nama_pasien ||
      !sampel.jenis_sampel ||
      !sampel.tanggal_pemeriksaan ||
      !sampel.hasil_pemeriksaan
    ) {
      alert("Kolom selain gambar tidak boleh kosong");
      setProcessing(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nama_pasien", sampel.nama_pasien);
    formDataToSend.append("jenis_sampel", sampel.jenis_sampel);
    formDataToSend.append("tanggal_pemeriksaan", sampel.tanggal_pemeriksaan);
    formDataToSend.append("hasil_pemeriksaan", sampel.hasil_pemeriksaan);
    if (sampel.gambar) {
      formDataToSend.append("gambar", sampel.gambar);
    }
    formDataToSend.append("_method", "PUT");

    try {
      const response = await updateSampel(id, formDataToSend);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setProcessing(false);
        return;
      }

      setSampel({
        nama_pasien: "",
        jenis_sampel: "",
        tanggal_pemeriksaan: "",
        hasil_pemeriksaan: "",
        path_gambar: "",
        gambar: null,
      });

      alert("Data sampel berhasil diubah");
      navigate("/");
    } catch (error) {
      alert("Terjadi kesalahan");
      console.error("An error occurred", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative">
      {/* Start Main */}
      <div
        className={`bg-slate-100 w-full h-[700px] p-10 text-slate-800 ${
          loading && "blur"
        }`}
      >
        <div className="w-full bg-white rounded-xl p-5">
          <h6 className="card-title font-bold text-xl">Perbaharui Sampel</h6>
          <div className="mt-7 pt-0.5">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="nama_pasien"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nama Pasien
                  </label>
                  <div className="mt-2">
                    <input
                      id="nama_pasien"
                      name="nama_pasien"
                      type="text"
                      autoComplete="given-name"
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={sampel.nama_pasien}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="jenis_sampel"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Jenis Sampel
                  </label>
                  <div className="mt-2">
                    <select
                      id="jenis_sampel"
                      name="jenis_sampel"
                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={sampel.jenis_sampel}
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
                    htmlFor="tanggal_pemeriksaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tanggal Pemeriksaan
                  </label>
                  <input
                    className="mt-2 p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="date"
                    name="tanggal_pemeriksaan"
                    id="tanggal_pemeriksaan"
                    onChange={handleChange}
                    value={sampel.tanggal_pemeriksaan}
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="hasil_pemeriksaan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hasil Pemeriksaan
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="hasil_pemeriksaan"
                      name="hasil_pemeriksaan"
                      rows={3}
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={sampel.hasil_pemeriksaan}
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
                    onChange={handleChange}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {sampel.path_gambar && (
                  <div>
                    <label
                      htmlFor="gambar-sebelumnya"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Gambar Sebelumnya
                    </label>
                    <div>
                      <img
                        src={"http://localhost:8000" + sampel.path_gambar}
                        alt={"Lampiran milik pasien " + sampel.nama_pasien}
                        width={200}
                        className="rounded-md mt-2"
                      />
                    </div>
                  </div>
                )}
                <div className="space-x-3 flex">
                  <Link to={"/"}>
                    <button className="w-32 h-10 bg-slate-500 rounded-lg px-3 py-1 text-white hover:bg-slate-800 transition-colors duration-300 ease-in-out">
                      Batal
                    </button>
                  </Link>
                  <Button
                    processing={processing}
                    text={processing ? "Processing..." : "Simpan"}
                    size={"w-32 h-10"}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Main */}

      {/* Start Loading */}
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen z-10 flex items-center justify-center">
          <Button processing={loading} text={"Loading..."} size={"w-32 h-10"} />
        </div>
      )}
      {/* End Loading */}
    </div>
  );
};

export default EditSampel;
