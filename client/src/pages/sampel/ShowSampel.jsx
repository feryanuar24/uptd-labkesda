import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { getSampel } from "../../api";
import Button from "../../components/UI/Button";

const ShowSampel = () => {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [sampel, setSampel] = useState({
    nama_pasien: "",
    jenis_sampel: "",
    tanggal_pemeriksaan: "",
    hasil_pemeriksaan: "",
    path_gambar: null,
  });

  const [loading, setLoading] = useState(true);

  const createPDF = () => {
    if (window.confirm("Apakah anda yakin ingin mendownload PDF?")) {
      const doc = new jsPDF();

      doc.text("Data Sampel Kesehatan Masyarakat", 10, 10);
      doc.text(`Nama: ${sampel.nama_pasien}`, 10, 20);
      doc.text(`Jenis Sampel: ${sampel.jenis_sampel}`, 10, 30);
      doc.text(`Tanggal Pemeriksaan: ${sampel.tanggal_pemeriksaan}`, 10, 40);
      doc.text(`Hasil Pemeriksaan: ${sampel.hasil_pemeriksaan}`, 10, 50);
      doc.text("Lampiran", 10, 60);

      if (sampel.path_gambar) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = "http://localhost:8000" + sampel.path_gambar;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imgData = canvas.toDataURL("image/jpeg");

          doc.addImage(imgData, "JPEG", 10, 70, 100, 100);
          doc.save(sampel.nama_pasien + ".pdf");
        };

        img.onerror = () => {
          console.error("Failed to load image");
          doc.save(sampel.nama_pasien + ".pdf");
        };
      } else {
        doc.save(sampel.nama_pasien + ".pdf");
      }
    }
  };

  useEffect(() => {
    const fetchSampel = async () => {
      setLoading(true);
      try {
        const response = await getSampel(id, token);
        if (!response.ok) {
          throw new Error("Failed to fetch sample data");
        }

        const data = await response.json();
        setSampel(data);
      } catch (error) {
        alert(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSampel();
  }, [id, token]);

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
            <Link to={"/"}>
              <Button processing={false} text={"Kembali"} size={"w-32 h-10"} />
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
          <div className="space-y-5">
            <h1 className="font-bold text-3xl mb-3 text-center">
              Data Sampel Kesehatan Masyarakat
            </h1>
            <div className="space-y-3">
              <h2>Nama: {sampel.nama_pasien}</h2>
              <p>Jenis Sampel: {sampel.jenis_sampel}</p>
              <p>Tanggal Pemeriksaan: {sampel.tanggal_pemeriksaan}</p>
              <p>Hasil Pemeriksan: {sampel.hasil_pemeriksaan}</p>
              {sampel.path_gambar && (
                <div>
                  <h2>Lampiran</h2>
                  <img
                    src={"http://localhost:8000" + sampel.path_gambar}
                    alt={"Lampiran milik pasien " + sampel.nama_pasien}
                    width={200}
                    className="rounded-lg mt-2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Main */}

      {/* Start Loading */}
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen z-10 flex items-center justify-center">
          <Button processing={true} text={"Loading..."} size={"w-32 h-10"} />
        </div>
      )}
      {/* End Loading */}
    </div>
  );
};

export default ShowSampel;
