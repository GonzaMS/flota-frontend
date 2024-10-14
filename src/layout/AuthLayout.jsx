import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="flex flex-col">
        <nav className="flex justify-between items-center p-4">
          <div className="text-2xl font-bold">Logo</div>
          <div className="space-x-4">
            <a href="/">Login</a>
            <a href="/register">Register</a>
          </div>
        </nav>
      </div>

      <main className="container mx-auto sm:grid sm:grid-cols-2 mt-32">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
