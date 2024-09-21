import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const IndexSampel = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [dropDownProfile, setDropDownProfile] = useState(false);
  const [sampels, setSampels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSampels = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/pemeriksaan-sampels",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          alert(data.message);
          return;
        }

        const data = await response.json();
        setLoading(false);
        setSampels(data);
      } catch (error) {
        console.error("Failed to fetch sampels", error);
        alert("Failed to fetch sampels");
      }
    };

    fetchSampels();
  }, [sampels]);

  const signOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const deleteSampel = async (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8000/api/pemeriksaan-sampels/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          alert(data.message);
          return;
        }

        alert("Sampel deleted successfully");
      } catch (error) {
        console.error("Failed to delete sampel", error);
        alert("Failed to delete sampel");
      }
    }
  };

  return (
    <div className="relative">
      {/* Main */}
      <div className={`${loading && "blur"}`}>
        {/* Start Header */}
        <div className="relative flex justify-between w-full items-start right-5 top-5 mb-10">
          {/* Start Create Button */}
          <Link
            to={"/create"}
            className="flex space-x-2 bg-indigo-500 text-white ml-10 rounded-lg px-5 py-2 hover:bg-indigo-600 transition-colors ease-in-out duration-300 shadow-lg"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>Create new</span>
          </Link>
          {/* End Create Button */}

          {/* Start Profile Button */}
          <button
            type="button"
            data-popover-target="dropdownProfile"
            data-popover-trigger="click"
            data-popover-placement="bottom-end"
            onClick={() => setDropDownProfile(!dropDownProfile)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-gray-500 dark:text-dark-icon hover:text-gray-600 transition-colors ease-in-out duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          {/* End Profile Button */}

          {/* Start Profile Dropdown */}
          <div
            id="dropdownProfile"
            className={`absolute z-10 right-0 top-10 bg-white text-left divide-y divide-gray-100 rounded-lg shadow dark:bg-dark-card-shade dark:divide-dark-border-four transition-opacity duration-300 ease-in-out ${
              dropDownProfile ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="px-4 py-3 text-sm text-slate-500">
              <div className="font-medium ">{user.name}</div>
              <div className="truncate">
                <a
                  href="http://template.codexshaper.com/cdn-cgi/l/email-protection"
                  className="__cf_email__"
                  data-cfemail="b6d7dad3ce84868482f6d1dbd7dfda98d5d9db"
                >
                  {user.email}
                </a>
              </div>
            </div>
            <div className="">
              <button
                onClick={(e) => signOut()}
                className="w-full flex font-medium px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-dark-icon  dark:hover:text-white hover:rounded-b-lg transition-colors ease-in-out duration-300 hover:w-full"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
        {/* End Profile Dropdown */}
        {/* End Header */}

        {/* Start Table */}
        <div className="">
          <table className="table-auto w-full whitespace-nowrap text-left text-gray-500 dark:text-dark-text font-medium leading-none mt-5">
            <thead className="font-semibold relative z-[1] before:absolute before:size-full before:bg-[#F4F4F4] dark:before:bg-dark-icon before:rounded-10 before:-z-[1]">
              <tr>
                <th className="px-3.5 py-4">Nama Pasien</th>
                <th className="px-3.5 py-4">Jenis Sampel</th>
                <th className="px-3.5 py-4">Tanggal Pemeriksaan</th>
                <th className="px-3.5 py-4">Hasil Pemeriksaan</th>
                <th className="px-3.5 py-4 w-0">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border-three text-heading dark:text-dark-text">
              {sampels.map((sampel) => (
                <tr key={sampel.id}>
                  <td className="flex items-center gap-2 px-3.5 py-5">
                    <div>
                      <h6 className="card-title text-lg line-clamp-1">
                        <Link to={"/show/" + sampel.id}>
                          {sampel.nama_pasien}
                        </Link>
                      </h6>
                    </div>
                  </td>
                  <td className="px-3.5 py-5">{sampel.jenis_sampel}</td>
                  <td className="px-3.5 py-5">{sampel.tanggal_pemeriksaan}</td>
                  <td className="px-3.5 py-5">{sampel.hasil_pemeriksaan}</td>
                  <td className="px-3.5 py-5">
                    <div className="flex items-center justify-center gap-5">
                      <Link to={"/edit/" + sampel.id} className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 text-slate-500 hover:text-slate-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </Link>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 text-slate-500 hover:text-slate-600"
                          onClick={() => deleteSampel(sampel.id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* End Table */}
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

export default IndexSampel;
