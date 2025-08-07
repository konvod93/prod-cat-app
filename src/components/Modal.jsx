import { XMarkIcon } from "@heroicons/react/24/outline";

// Компонент модального окна
// Используется для отображения форм входа и регистрации

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transition-colors duration-300">
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

export default Modal;