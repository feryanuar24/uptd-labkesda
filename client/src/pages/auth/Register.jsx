import { useState } from "react";
import registerImg from "../../images/undraw_login_re_4vu2.svg";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (!name || !email || !password || !passwordConfirmation) {
      alert("All fields are required.");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful.");
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setProcessing(false);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-12 gap-y-7 sm:gap-7 card px-4 sm:px-10 2xl:px-[70px] py-15 lg:items-center lg:min-h-[calc(100vh_-_32px)]">
        <div className="col-span-full lg:col-span-6">
          <div className="flex flex-col items-center justify-center gap-10 text-center">
            <div className="hidden sm:block">
              <img src={registerImg} alt="Register Illustration" />
            </div>
            <div>
              <h3 className="text-xl md:text-[28px] leading-none font-semibold text-heading">
                Welcome New User!
              </h3>
              <p className="font-medium text-gray-500 dark:text-dark-text mt-4 px-[10%]">
                Please enter your details to create a new account.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-6 w-full lg:max-w-[600px]">
          <div className="border border-form dark:border-dark-border p-5 md:p-10 rounded-20 rounded-3xl">
            <h3 className="text-xl md:text-[28px] leading-none font-semibold text-heading">
              Sign Up
            </h3>
            <p className="font-medium text-gray-500 dark:text-dark-text mt-4">
              Welcome! create on your account
            </p>
            <form
              action="two-step.html"
              className="leading-none mt-8"
              onSubmit={handleRegister}
            >
              <div className="mb-2.5 flex flex-col gap-y-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Fery Anuar"
                  required
                  className="form-input px-4 py-3.5 rounded-lg border-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <div className="mt-5 flex flex-col gap-y-3 mb-5">
                  <label htmlFor="password" className="form-label">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    placeholder="Password Confirmation"
                    required
                    className="form-input px-4 py-3.5 rounded-lg border-2"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                to={"/login"}
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

export default Register;
