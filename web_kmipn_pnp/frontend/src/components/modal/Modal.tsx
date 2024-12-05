import React from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean; // Untuk bukak dan tutuik modal
    onClose: () => void; // untuk nutuik modal see
    title: string; // Judul modal
    children: React.ReactNode; // Isi modal
}

const ModalCustom: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // Jangan render apa-apa jika modal tidak terbuka

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[999] ${isOpen ? "fadeIn" : "fadeOut"}`}>
            <div className="border top-0 absolute border-gray-900 dark:border-gray-700 rounded-lg shadow-lg w-full max-w-xl mx-4 p-6 md:relative modal-content">
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-800"
                >
                    ✕
                </button>
                {/* Judul */}
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                {/* Isi Modal */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default ModalCustom;
