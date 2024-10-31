import { Button } from "@/components/ui/button";
import useReports from "@/hooks/useReports";
import { FaFileAlt } from "react-icons/fa";

const GenerateReportButton = () => {
  const { getReports } = useReports();

  const handleGenerateReport = async () => {
    const res = await getReports();
    console.log(res);
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
