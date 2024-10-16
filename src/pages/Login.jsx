import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUser from "../hooks/useUser";

const Login = () => {
  const { getLogin, isLoading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [localError, setLocalError] = useState(null);

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
    <div className="flex items-center justify-center">
      <div className="mx-auto max-w-sm w-full">
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
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>

            {/* Show errors */}
            {localError && (
              <div className="text-red-500">
                {localError.validationErrors &&
                localError.validationErrors.length > 0 ? (
                  <ul>
                    {localError.validationErrors.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Error: {localError.message || "Unknown error"}</p>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
