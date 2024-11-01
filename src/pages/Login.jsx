import { Error } from "@/components/Error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUser from "../hooks/useUser";

const Login = () => {
  const { getLogin, isLoading } = useUser();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginParams = {
      email: email,
      password: password,
    };

    try {
      const res = await getLogin(loginParams);

      if (res.token) {
        login(res);
        navigate("/dashboard");
      } else {
        setLocalError(res);
      }
    } catch (err) {
      setLocalError(err);
    }
  };

  return (
    <div className="flex items-center justify-center shadow-lg ">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-sm w-full">
        <div>
          <h1 className="text-indigo-600 font-black text-3xl text-center">
            Login to manage your car fleet
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-4">
            <div className="space-y-2 text-start">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="jondoe@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2 text-start">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right text-blue-700 hover:text-blue-500">
              <a href="/forgot_password">Forgot password?</a>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>

            {/* Show errors */}
            {localError && (
              <Error>
                {localError.validationErrors &&
                localError.validationErrors.length > 0 ? (
                  <ul>
                    {localError.validationErrors.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{localError.message || "Unknown error"}</p>
                )}
              </Error>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
