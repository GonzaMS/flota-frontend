import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen bg-gray-800 text-white flex flex-col p-5 space-y-6 transition-all duration-300`}
    >
      <button
        className="text-white bg-indigo-500 rounded p-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Cerrar" : "Abrir"}
      </button>

      {isOpen && (
        <h1 className="text-2xl lg:text-3xl font-bold text-indigo-400">
          Control de Flota
        </h1>
      )}

      <nav className={`mt-10 ${!isOpen && "hidden md:block"}`}>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard/vehiculos" className="hover:text-indigo-400">
              Gestión de Vehículos
            </Link>
          </li>
          <li>
            <Link to="/dashboard/conductores" className="hover:text-indigo-400">
              Gestión de Conductores
            </Link>
          </li>
          <li>
            <Link to="/dashboard/ordenes" className="hover:text-indigo-400">
              Gestión de Órdenes de Viaje
            </Link>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <Button className="bg-indigo-500 text-white mt-auto">
          Generar Reporte
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
