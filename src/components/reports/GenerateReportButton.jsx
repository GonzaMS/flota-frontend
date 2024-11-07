import { Button } from "@/components/ui/button";
import useReports from "@/hooks/useReports";
import { FaFileAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const GenerateReportButton = () => {
  const { getReports, isLoading } = useReports();

  const handleGenerateReport = async () => {
    try {
      const blob = await getReports();

      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_vehiculos.pdf");
      document.body.appendChild(link);

      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Reporte descargado exitosamente.");
    } catch (err) {
      console.error("Error al generar el reporte:", err);
      toast.error(
        err.message || "Error al generar el reporte. Inténtalo nuevamente."
      );
    }
  };

  return (
    <Button
      className="bg-indigo-500 text-white mt-auto flex items-center"
      onClick={handleGenerateReport}
      // disabled={isLoading}
      disabled={true}
    >
      <FaFileAlt size={20} />
      <span>Generate Report</span>
    </Button>
  );
};

export default GenerateReportButton;
