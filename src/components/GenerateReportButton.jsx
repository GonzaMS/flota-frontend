import { Button } from "@/components/ui/button";
import axios from "axios";
import { saveAs } from "file-saver";
import { FaFileAlt } from "react-icons/fa";

const GenerateReportButton = () => {
  const apiURL = "/api/v1/car-reports/export";

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(apiURL, {
        responseType: "blob",
      });

      console.log(response);

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, "reporte_vehiculos.pdf");
    } catch (error) {
      console.error("Error generating the report:", error);
    }
  };

  return (
    <Button
      className="bg-indigo-500 text-white mt-auto flex items-center space-x-6"
      onClick={handleGenerateReport}
    >
      <FaFileAlt size={20} />
      <span>Generate Report</span>
    </Button>
  );
};

export default GenerateReportButton;
