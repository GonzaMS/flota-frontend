import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ConfirmAccount from "./pages/ConfirmAccount";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes-app/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas, envueltas en el AuthLayout */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
          <Route path="confirm_account/:id" element={<ConfirmAccount />} />
        </Route>

        {/* Rutas protegidas con DashboardLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            {/* Agrega más rutas anidadas dentro de dashboard aquí */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
