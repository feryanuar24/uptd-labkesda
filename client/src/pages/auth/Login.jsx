import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../images/undraw_login_re_4vu2.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful.");
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setProcessing(false);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-12 gap-y-7 sm:gap-7 card px-4 sm:px-10 2xl:px-[70px] py-15 lg:items-center lg:min-h-[calc(100vh_-_32px)]">
        <div className="col-span-full lg:col-span-6">
          <div className="flex flex-col items-center justify-center gap-10 text-center">
            <div className="hidden sm:block">
              <img src={loginImg} alt="Register Illustration" />
            </div>
            <div>
              <h3 className="text-xl md:text-[28px] leading-none font-semibold text-heading">
                Welcome back!
              </h3>
              <p className="font-medium text-gray-500 dark:text-dark-text mt-4 px-[10%]">
                You must log in first to manage health data laboratory services.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-6 w-full lg:max-w-[600px]">
          <div className="border border-form dark:border-dark-border p-5 md:p-10 rounded-20 rounded-3xl">
            <h3 className="text-xl md:text-[28px] leading-none font-semibold text-heading">
              Sign In
            </h3>
            <p className="font-medium text-gray-500 dark:text-dark-text mt-4">
              Welcome Back! Log in to your account
            </p>
            <form
              action="two-step.html"
              className="leading-none mt-8"
              onSubmit={handleLogin}
            >
              <div className="mt-5 flex flex-col gap-y-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="fery.anuar@example.com"
                  required
                  className="form-input px-4 py-3.5 rounded-lg border-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="md:flex justify-between ">
                <div className="mt-5 flex flex-col gap-y-3 mb-5">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    className="form-input px-4 py-3.5 rounded-lg border-2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {processing ? (
                <button
                  type="button"
                  className="justify-center w-full inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
              ) : (
                <button
                  type="submit"
                  className="btn b-solid btn-primary-solid w-full bg-indigo-500 text-white h-10 rounded-lg hover:bg-indigo-600 transition-colors duration0-300 ease-in-out"
                >
                  Sign Up
                </button>
              )}
            </form>
            <div className="text-gray-900 dark:text-dark-text font-medium leading-none mt-5">
              Have an account?
              <Link
                to={"/register"}
                className="text-primary-500 font-semibold ml-1 text-indigo-500 text-bold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
