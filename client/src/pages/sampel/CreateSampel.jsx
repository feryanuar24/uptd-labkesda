import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createSampel } from "../../api";
import Button from "../../components/UI/Button";

const CreateSampel = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    nama_pasien: "",
    jenis_sampel: "",
    tanggal_pemeriksaan: "",
    hasil_pemeriksaan: "",
    gambar: null,
  });
  const {
    nama_pasien,
    jenis_sampel,
    tanggal_pemeriksaan,
    hasil_pemeriksaan,
    gambar,
  } = formData;

  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: id === "gambar" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (
      !nama_pasien ||
      !jenis_sampel ||
      !tanggal_pemeriksaan ||
      !hasil_pemeriksaan
    ) {
      alert("Input other than image can't be empty");
      setProcessing(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nama_pasien", nama_pasien);
    formDataToSend.append("jenis_sampel", jenis_sampel);
    formDataToSend.append("tanggal_pemeriksaan", tanggal_pemeriksaan);
    formDataToSend.append("hasil_pemeriksaan", hasil_pemeriksaan);

    if (gambar) {
      formDataToSend.append("gambar", gambar);
    }

    try {
      const response = await createSampel(token, formDataToSend);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setProcessing(false);
        return;
      }

      setFormData({
        nama_pasien: "",
        jenis_sampel: "",
        tanggal_pemeriksaan: "",
        hasil_pemeriksaan: "",
        gambar: null,
      });

      alert("Data sampel berhasil ditambahkan");
      navigate("/");
    } catch (error) {
      alert("Gagal menambahkan data sampel");
      console.error("Gagal menambahkan data sampel", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-slate-100 w-full h-[700px] p-10 text-slate-800">
      <div className="w-full bg-white rounded-xl p-5">
        <h6 className="card-title font-bold text-xl">Tambah Sampel</h6>
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
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-3 pb-5">
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
  );
};

export default CreateSampel;
