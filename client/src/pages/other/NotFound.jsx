import notFoundImg from "../../images/undraw_page_not_found_re_e9o6.svg";

const NotFound = () => {
  return (
    <div>
      <div className="main-content m-4 h-full">
        <div className="card min-h-[calc(100vh_-_32px)] flex-center">
          <div className="flex-center flex-col gap-10 text-center">
            <div>
              <img src={notFoundImg} alt="Not Found" />
            </div>
            <h3 className="text-2xl sm:text-[42px] leading-[1.23] font-semibold text-heading">
              Ooops... 404!
            </h3>
            <p className="font-spline_sans text-gray-900 dark:text-dark-text">
              The page you're trying to access doesn't seem to exist.
            </p>
            <a
              href="dashboard-lms.html"
              className="btn b-solid btn-primary-solid btn-lg"
            >
              Back To Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
