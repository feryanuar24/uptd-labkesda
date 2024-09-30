import { Link } from "react-router-dom";
import registerImg from "../assets/images/undraw_login_re_4vu2.svg";
import Register from "../components/Auth/Register";

const RegisterPage = () => {
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
            <Register />
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

export default RegisterPage;
