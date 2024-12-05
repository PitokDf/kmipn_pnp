"use client";

import ModalCustom from "@/components/modal/Modal";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { faExclamationTriangle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function DeleteUser({ data }: { data: User }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleModal = () => { setIsOpen(!isOpen) }
    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const response = await api.delete(`/api/v1/users/${data.id}`);
            if (response.status === 200) {
                setIsOpen(false);
                mutate("/api/v1/users")
                toast.success(response.data.msg)
            }
        } catch (error: any) {
            console.log(error);
            const errorStatus = error.status;
            if (errorStatus === 400) {
                toast.error(error.response.data.msg)
            } else {
                toast.error("Terjadi masalah saat menghapus data.")
            }
        } finally { setIsLoading(false) }
    }
    return (
        <div>
            <button
                onClick={handleModal}
                className="btn btn-sm btn-solid-error"
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <ModalCustom
                isOpen={isOpen}
                onClose={handleModal}
                title="Konfirmasi Hapus!"
                children={
                    <div className="flex flex-col justify-center gap-3">
                        <FontAwesomeIcon icon={faExclamationTriangle} size="6x" />
                        <span className="text-center text-xl font-medium">Yakin ingin menghapus data ini?</span>
                        <div className="flex gap-6 mt-6">
                            <button className="btn w-full rounded-md" onClick={handleModal}>Batal</button>
                            <button disabled={isLoading}
                                className={`btn btn-error w-full rounded-md flex gap-5 ${isLoading && "btn-loading"}`}
                                onClick={handleDelete}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                                Hapus
                            </button>
                        </div>
                    </div>
                }
            />
        </div>
    );
}