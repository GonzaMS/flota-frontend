import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarForm from "./components/CarForm";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import CarManagement from "./pages/CarManagement";
import ConfirmAccount from "./pages/ConfirmAccount";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes-app/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot_password" element={<ForgotPassword />} />
            <Route path="confirm_account/:id" element={<ConfirmAccount />} />
          </Route>

          {/* Protected routes dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard/cars" element={<CarManagement />} />
              <Route path="/dashboard/cars/new" element={<CarForm />} />
              <Route path="/dashboard/cars/:carId/edit" element={<CarForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
