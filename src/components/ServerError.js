import { FaExclamationTriangle } from 'react-icons/fa';

const ServerErrorComponent = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded p-4 shadow">
      <div className="flex items-center mb-4">
        <FaExclamationTriangle className="text-red-500 text-xl mr-2" />
        <div>
          <p className="text-red-500 font-bold">Error: No se pudo conectar al servidor.</p>
          <p>Por favor, inténtalo de nuevo más tarde.</p>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorComponent;
