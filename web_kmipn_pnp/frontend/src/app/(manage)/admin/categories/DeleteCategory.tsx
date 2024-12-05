'use client'

import Modal from "@/components/modal/Modals";
import { api } from "@/lib/api";
import { Categories } from "@/lib/types";
import { faExclamationTriangle, faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function DeleteCategory({ data }: { data: Categories }) {
    const modalCheckBox = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ categoriName: null })

    const handleCloseModal = () => {
        if (modalCheckBox.current) {
            const refCurrent: any = modalCheckBox.current;
            refCurrent.checked = false
        }
    }

    const clear = () => {
        setErrors({ categoriName: null })
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const response = await api.delete(`/api/v1/categories/${data.id}`, { headers: { "Content-Type": "application/json" } });
            if (response.status === 200) {
                toast.success(response.data.msg);
                clear();
                mutate("/api/v1/categories-close")
                handleCloseModal();
            }
        } catch (error: any) {
            console.log(error);
            if (error.status === 400) {
                const errors = error.response.data.errors;
                setErrors(errors)
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <label htmlFor={`modal_delete_category_${data.id}`} className="btn btn-rounded btn-solid-error btn-sm w-max flex gap-2">
                <FontAwesomeIcon icon={faTrashAlt} />
            </label>
            <Modal ref={modalCheckBox} id={`modal_delete_category_${data.id}`} title={`Delete Category (${data.categoriName})`} onClose={() => { }} actions={[
                {
                    disabled: isLoading,
                    label: "Delete",
                    className: "btn btn-error btn-sm",
                    onClick: handleSubmit
                },
            ]} content={
                <div className="flex flex-col justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="5x" className="text-error mt-3 mb-3" />
                    <span className="text-center font-medium text-xl text-wrap">Yakin ingin menghapus data ini?</span>
                    <span className="text-center font-medium text-md text-error text-wrap">setelah dihapus data tidak dapat dipulihkan!</span>
                </div>
            } />
        </>
    )
}