import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmAccount = () => {
  const { code } = useParams();
  const { activateAccount, error, isLoading } = useUser();
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  const navigate = useNavigate();

  const handleActivateAccount = async () => {
    try {
      const res = await activateAccount(code);
      console.log(res);

      if (res.activation) {
        setConfirmationStatus("Account activated successfully.");
        toast.success("Account activated successfully.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setConfirmationStatus(err.message || "Error activating the account.");
      toast.error(err.message || "Error activating the account.");
    }
  };

  useEffect(() => {
    handleActivateAccount();
  }, [code]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">
          Account confirmation
        </h1>
        {isLoading && <p className="text-gray-500">Activating account...</p>}
        {confirmationStatus && (
          <p className="text-green-600">{confirmationStatus}</p>
        )}
        {error && (
          <p className="text-red-600">
            {error.message || "Error activating the account."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmAccount;
