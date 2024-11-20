import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <nav className="flex justify-between items-center w-full max-w-4xl mx-auto p-4">
          <div className="text-2xl font-bold">
            <img src={logo} alt="Logo" className="h-24 w-auto" />
          </div>
          <div className="space-x-8">
            <Link to="/" className="text-lg">
              Login
            </Link>
            <Link to="/register" className="text-lg">
              Register
            </Link>
          </div>
        </nav>

        <main className="flex flex-col items-center justify-center flex-grow w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AuthLayout;
