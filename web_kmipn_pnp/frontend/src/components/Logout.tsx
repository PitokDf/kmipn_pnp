'use client'

import { useState } from "react";
import { UserName } from "./UserInfo";
import Modal from "./modal/Modals";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faExclamationTriangle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import ModalConfirmation from "./modal/ModalConfirmation";

export default function Logout() {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const result = await signOut({ redirect: false });

            window.location.reload();

        } finally {
            setIsLoading(false)
        }

    }
    return (
        <>
            <label htmlFor="logoutModal" onClick={handleModal}>
                <div className="flex justify-between hover:cursor-pointer content-center p-3 hover:bg-gray-800">
                    <UserName />
                    <FontAwesomeIcon icon={faSignOut} className="text-red-500" />
                </div>
            </label>
            <ModalConfirmation
                title="Konfirmasi Keluar"
                isOpen={isOpen}
                isLoading={isLoading}
                handleConfirmation={handleLogout}
                icon={faExclamationTriangle}
                labelConfirmation="Yaa"
                onClose={handleModal}
                text="Keluar dulu? Jangan lupa balik lagi untuk cek progress tim kamu!"
            />
        </>
    );
}