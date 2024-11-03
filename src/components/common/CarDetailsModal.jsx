import { Button } from "@/components/ui/button";

const CarDetailsModal = ({ details, onClose }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Car Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="space-y-4">
        {["Kilometers", "Trips", "Other Data"].map((label, idx) => (
          <div key={idx} className="flex items-center">
            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-3"></span>
            <p className="text-lg">
              <strong>{label}:</strong>{" "}
              {details[label.toLowerCase().replace(" ", "")]}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          onClick={onClose}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-all"
        >
          Close
        </Button>
      </div>
    </div>
  </div>
);

export default CarDetailsModal;
