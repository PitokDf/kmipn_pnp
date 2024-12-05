"use client"

import ModalConfirmation from "@/components/modal/ModalConfirmation";
import { api } from "@/lib/api";
import { faExclamationTriangle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function DeleteProposal({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const response = await api.delete(`/api/v1/proposals/${id}`);
            if (response.status === 200) {
                toast.success(response.data.msg);
                mutate("/api/v1/proposals");
                handleModal();
            }
        } catch (error) {
            console.log(error);
            toast.error("Terjadi masalah, silahkan cek konsol!.")
        } finally { setIsLoading(false) }
    }

    return (
        <div>
            <button onClick={handleModal} className="btn btn-sm btn-solid-error"><FontAwesomeIcon icon={faTrashAlt} /></button>
            <ModalConfirmation
                handleConfirmation={handleDelete}
                icon={faExclamationTriangle}
                isLoading={isLoading}
                isOpen={isOpen}
                onClose={handleModal}
                text="Yakin ingin menhapus proposal ini?"
                labelConfirmation="Hapus"
                title="Konfirmasi Hapus"
            />
        </div>
    );
}