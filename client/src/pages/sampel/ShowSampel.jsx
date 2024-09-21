import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const ShowSampel = () => {
  const { id } = useParams();

  const [namaPasien, setNamaPasien] = useState("");
  const [jenisSampel, setJenisSampel] = useState("");
  const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState("");
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState("");
  const [loading, setLoading] = useState(true);

  const createPDF = () => {
    if (window.confirm("Apakah anda yakin ingin mendownload PDF?")) {
      const doc = new jsPDF();

      doc.text("Data Sampel Kesehatan Masyarakat", 10, 10);
      doc.text(`Nama: ${namaPasien}`, 10, 20);
      doc.text(`Jenis Sampel: ${jenisSampel}`, 10, 30);
      doc.text(`Tanggal Pemeriksaan: ${tanggalPemeriksaan}`, 10, 40);
      doc.text(`Hasil Pemeriksaan: ${hasilPemeriksaan}`, 10, 50);

      doc.save(namaPasien + ".pdf");
    }
  };

  useEffect(() => {
    const fetchSampel = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/pemeriksaan-sampels/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        alert("Gagal mendapatkan data sampel");
        return;
      }

      setLoading(false);

      const data = await response.json();

      setNamaPasien(data.nama_pasien);
      setJenisSampel(data.jenis_sampel);
      setTanggalPemeriksaan(data.tanggal_pemeriksaan);
      setHasilPemeriksaan(data.hasil_pemeriksaan);
    };

    fetchSampel();
  }, [id]);

  return (
    <div className="relative">
      {/* Start Main */}
      <div
        className={`bg-slate-100 w-full h-screen flex items-center justify-center ${
          loading && "blur"
        }`}
      >
        <div className="bg-white w-[1000px] h-[500px] rounded-xl p-5 space-y-5">
          <div className="w-full flex justify-between">
            <Link
              to={"/"}
              className="flex space-x-3 bg-indigo-500 hover:bg-indigo-600 transition-colors ease-in-out duration-300 text-white px-3 py-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <p>Back</p>
            </Link>
            <button onClick={createPDF}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-slate-500 hover:text-slate-600 transition-colors duration-300 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-10">
            <h1 className="font-bold text-3xl mb-3 text-center">
              Data Sampel Kesehatan Masyarakat
            </h1>
            <div className="space-y-5">
              <h2>Nama: {namaPasien}</h2>
              <p>Jenis Sampel: {jenisSampel}</p>
              <p>Tanggal Pemeriksaan: {tanggalPemeriksaan}</p>
              <p>Hasil Pemeriksann: {hasilPemeriksaan}</p>
            </div>
          </div>
        </div>
      </div>
      {/* End Main */}

      {/* Start Loading */}
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen z-10 flex items-center justify-center">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
            disabled
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
        </div>
      )}
      {/* End Loading */}
    </div>
  );
};

export default ShowSampel;
