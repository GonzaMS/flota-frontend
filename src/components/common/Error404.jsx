import { Link } from "react-router-dom";
import errorImage404 from "../../assets/errors/404.png";

const Error404 = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <img
      src={errorImage404}
      alt="404 - Page Not Found"
      className="w-4/5 md:w-1/2 lg:w-3/6 mb-8"
    />

    <Link
      to="/"
      className="px-5 py-3 text-white rounded-md text-lg bg-indigo-600 hover:bg-indigo-700 transition duration-200"
    >
      Return to Home
    </Link>
  </div>
);

export default Error404;
