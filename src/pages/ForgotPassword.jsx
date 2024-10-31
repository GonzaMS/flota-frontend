import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading } = useUser();
  const navigate = useNavigate();

  const handleSubmmit = async (e) => {
    e.preventDefault();
    const forgotPasswordParams = {
      email: email,
    };

    try {
      const res = await forgotPassword(forgotPasswordParams);
      if (res) {
        toast.success(`Mail for change password sended to ${email}`);
        navigate("/login");
      }
    } catch (err) {
      toast.error("Error sending email");
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-scree">
        <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-sm w-full">
          <h1 className="text-indigo-600 font-black text-3xl text-center mb-6">
            Forgot your password?
          </h1>
          <form onSubmit={handleSubmmit} className="space-y-6">
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
              <div className="text-center">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Send email"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
