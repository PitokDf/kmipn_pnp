'use client'

import Modal from "@/components/modal/Modals";
import { api } from "@/lib/api";
import { Categories } from "@/lib/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function EditCategory({ data }: { data: Categories }) {
    const modalCheckBox = useRef(null);
    const [form, setForm] = useState<{ categoriName: string | null, description: string | null }>({ categoriName: null, description: null });
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

    useEffect(() => { setForm({ categoriName: data.categoriName, description: data.description }) }, [data.categoriName])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const response = await api.put(`/api/v1/categories/${data.id}`, form, { headers: { "Content-Type": "application/json" } });
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
                if (error.status === 400) {
                    const errors = error.response.data.errors;
                    const newErrors: any = {}
                    if (Array.isArray(errors)) {
                        errors.forEach((error) => {
                            newErrors[error.path] = error.msg
                        })
                    }
                    setErrors(newErrors);
                }
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <label htmlFor={`modal_update_category_${data.id}`} className="btn btn-rounded btn-solid-warning btn-sm w-max flex gap-2">
                <FontAwesomeIcon icon={faPencil} />
            </label>
            <Modal ref={modalCheckBox} id={`modal_update_category_${data.id}`} title={`Update Category (${data.categoriName})`} onClose={() => { }} actions={[
                {
                    disabled: isLoading,
                    label: "Update",
                    className: "btn btn-warning btn-sm",
                    onClick: handleSubmit
                },
            ]} content={
                <>
                    <div className="form-group">
                        <div className="form-field">
                            <label htmlFor="" className="form-label">Nama Kategori</label>
                            <input
                                type="text"
                                className={`input max-w-full ${errors.categoriName && "input-error"}`}
                                required
                                placeholder="IOT"
                                name="categoriName"
                                value={form.categoriName ?? data.categoriName}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {errors.categoriName && (
                                <label className="form-label">
                                    <span className="form-label-alt text-error">{errors.categoriName}</span>
                                </label>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="" className="form-label">Deskripsi Kategori</label>
                            <input
                                type="text"
                                className="input max-w-full"
                                required
                                placeholder="IOT adalah"
                                name="description"
                                value={form.description ?? data.description ?? 'no description'}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                </>
            } />
        </>
    )
}