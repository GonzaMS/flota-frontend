import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { forgotPassword, isLoading } = useUser();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const res = await forgotPassword(email);

      if (
        res["forgot-password"] &&
        res["forgot-password"].includes("Password reset email sent")
      ) {
        toast.success("Password reset email sent.");
        setEmail("");
      } else {
        toast.error(res.error || "Failed to send reset email.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center shadow-lg ">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-sm w-full">
        <div>
          <h1 className="text-indigo-600 font-black text-3xl text-center">
            Forgot Password
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

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Email"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
