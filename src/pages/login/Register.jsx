import { Error } from "@/components/Error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { registerUser, isLoading } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");

  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerParams = {
      firstname: firstName,
      lastname: lastName,
      username,
      email,
      password,
      confirm_password: confirmPassword,
      date_of_birth,
    };

    if (password !== confirmPassword) {
      setLocalError({
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const res = await registerUser(registerParams);

      if (res.register) {
        toast.success(
          "Account created successfully. Please check your email to confirm your account."
        );
        navigate("/");
      } else {
        setLocalError(res);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setLocalError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center shadow-lg">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-sm w-full">
        <div>
          <h1 className="text-indigo-600 font-black text-3xl text-center">
            Register to manage your car fleet
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-4">
            <div className="space-y-2 text-start">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                placeholder="John"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="space-y-2 text-start">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                placeholder="Doe"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="space-y-2 text-start">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2 text-start">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                required
                type="email"
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-start">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  required
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-start">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                required
                type="date"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </Button>

            {/* Show errors*/}
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

export default Register;
