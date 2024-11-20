import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IncidentForm from "./components/car/car_incidents/IncidentForm";
import MaintenanceForm from "./components/car/car_maintenance/MaintenanceForm";
import CarForm from "./components/car/car_management/CarForm";
import Error404 from "./components/common/Error404";
import Error500 from "./components/common/Error500";
import DriverAssignerForm from "./components/Driver/DriverAssignerForm";
import DriverForm from "./components/Driver/DriverForm";
import DriverIncidentsForm from "./components/Driver/DriverIncidentsForm";
import DrivingHistoryForm from "./components/Driver/DrivingHistoryForm";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import CarIncidents from "./pages/car/CarIncidents";
import CarMaintenance from "./pages/car/CarMaintenance";
import CarManagement from "./pages/car/CarManagement";
import Dashboard from "./pages/Dashboard";
import DriverAssignerManagement from "./pages/Driver/DriverAssignerManagement";
import DriverHistoryManagement from "./pages/Driver/DriverHistoryManagement";
import DriverIncidentsManagement from "./pages/Driver/DriverIncidentsManagement";
import DriverManagement from "./pages/Driver/DriverManagement";
import ConfirmAccount from "./pages/login/ConfirmAccount";
import ForgotPassword from "./pages/login/ForgotPassword";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import ResetPassword from "./pages/login/ResetPassword";
import ProtectedRoute from "./routes-app/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm_account/:code" element={<ConfirmAccount />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
          <Route path="reset_password/:token" element={<ResetPassword />} />
        </Route>

        {/* Protected routes for the dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/cars" element={<CarManagement />} />
            <Route path="/dashboard/cars/new" element={<CarForm />} />
            <Route path="/dashboard/cars/:carId/edit" element={<CarForm />} />

            {/* Driver routes */}
            <Route path="/dashboard/drivers" element={<DriverManagement />} />
            <Route path="/dashboard/drivers/new" element={<DriverForm />} />
            <Route
              path="/dashboard/drivers/:driverId/edit"
              element={<DriverForm />}
            />
            <Route
              path="/dashboard/driver-history"
              element={<DriverHistoryManagement />}
            />
            <Route
              path="/dashboard/driver-history/new"
              element={<DrivingHistoryForm />}
            />
            <Route
              path="/dashboard/driver-history/:drivingHistoryId/edit"
              element={<DrivingHistoryForm />}
            />
            <Route
              path="/dashboard/driver-incidents"
              element={<DriverIncidentsManagement />}
            />
            <Route
              path="/dashboard/driver-incidents/new"
              element={<DriverIncidentsForm />}
            />
            <Route
              path="/dashboard/driver-incidents/:incidentId/edit"
              element={<DriverIncidentsForm />}
            />
            <Route
              path="/dashboard/driver-assigner"
              element={<DriverAssignerManagement />}
            />
            <Route
              path="/dashboard/driver-assigner/new"
              element={<DriverAssignerForm />}
            />
            <Route
              path="/dashboard/driver-assigner/:assignerId/edit"
              element={<DriverAssignerForm />}
            />

            {/* Maintenance routes */}
            <Route path="/dashboard/maintenance" element={<CarMaintenance />} />
            <Route
              path="/dashboard/maintenance/new"
              element={<MaintenanceForm />}
            />
            <Route
              path="/dashboard/maintenance/:maintenanceId/edit"
              element={<MaintenanceForm />}
            />
            {/* Car Incidents */}
            <Route path="/dashboard/incidents" element={<CarIncidents />} />
            <Route path="/dashboard/incidents/new" element={<IncidentForm />} />
            <Route
              path="/dashboard/incidents/:incidentId/edit"
              element={<IncidentForm />}
            />
          </Route>
        </Route>

        {/* Errors */}
        <Route path="/error-500" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
