import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarForm from "./components/car/car_management/CarForm";
import MaintenanceForm from "./components/car/MaintenanceForm";
import Error404 from "./components/common/Error404";
import Error500 from "./components/common/Error500";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import CarMaintenance from "./pages/car/CarMaintenance";
import CarManagement from "./pages/car/CarManagement";
import Dashboard from "./pages/Dashboard";
import ConfirmAccount from "./pages/login/ConfirmAccount";
import ForgotPassword from "./pages/login/ForgotPassword";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
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
            <Route path="confirm_account/:code" element={<ConfirmAccount />} />
          </Route>

          {/* Protected routes for the dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard/cars" element={<CarManagement />} />
              <Route path="/dashboard/cars/new" element={<CarForm />} />
              <Route path="/dashboard/cars/:carId/edit" element={<CarForm />} />

              {/* Maintenance routes */}
              <Route
                path="/dashboard/maintenance"
                element={<CarMaintenance />}
              />
              <Route
                path="/dashboard/maintenance/new"
                element={<MaintenanceForm />}
              />
              <Route
                path="/dashboard/maintenance/:maintenanceId/edit"
                element={<MaintenanceForm />}
              />
            </Route>
          </Route>

          {/* Errors */}
          <Route path="/error-500" element={<Error500 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
