import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarForm from "./components/CarForm";
import DriverForm from './components/DriverForm';
import DrivingHistoryForm from './components/DrivingHistoryForm';
import DriverIncidentsForm from './components/DriverIncidentsForm';
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import CarManagement from "./pages/CarManagement";
import DriverManagement from './pages/DriverManagement';
import DriverHistoryManagement from './pages/DriverHistoryManagement';
import DriverIncidentsManagement from './pages/DriverIncidentsManagement'; 
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
              <Route path="/dashboard/drivers" element={<DriverManagement />} />
              <Route path="/dashboard/drivers/new" element={<DriverForm />} />
              <Route path="/dashboard/drivers/:driverId/edit" element={<DriverForm />} />
              <Route path="/dashboard/driver-activity" element={<DriverHistoryManagement />} />
              <Route path="/dashboard/driver-activity/new" element={<DrivingHistoryForm />} />
              <Route path="/dashboard/driver-activity/:drivingHistoryId/edit" element={<DrivingHistoryForm />} />
              <Route path="/dashboard/driver-incidents" element={<DriverIncidentsManagement />} /> 
              <Route path="/dashboard/driver-incidents/new" element={<DriverIncidentsForm />} /> 
              <Route path="/dashboard/driver-incidents/:incidentId/edit" element={<DriverIncidentsForm />} /> 
              
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
