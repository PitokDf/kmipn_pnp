'use client'

import Modal from "@/components/modal/Modals";
import { api } from "@/lib/api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function AddCategory() {
    const modalCheckBox = useRef(null);
    const [form, setForm] = useState<{ categoriName: string, description: string, deadline: string }>({ categoriName: "", description: "", deadline: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ categoriName: null })

    const handleCloseModal = () => {
        if (modalCheckBox.current) {
            const refCurrent: any = modalCheckBox.current;
            refCurrent.checked = false
        }
    }

    const clear = () => {
        setForm({ categoriName: "", description: "", deadline: "" });
        setErrors({ categoriName: null })
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const response = await api.post("/api/v1/categories", form, { headers: { "Content-Type": "application/json" } });
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
            <label htmlFor="modal_add_category" className="btn btn-rounded btn-outline-primary btn-sm w-max flex gap-2">
                <FontAwesomeIcon icon={faPlus} />
                Add Category
            </label>
            <Modal ref={modalCheckBox} id="modal_add_category" title="Add Category" onClose={() => { }} actions={[
                {
                    disabled: isLoading,
                    label: "Save",
                    className: "btn btn-primary btn-sm",
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
                                value={form.categoriName}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {errors.categoriName && (
                                <label className="form-label">
                                    <span className="form-label-alt text-error">{errors.categoriName}</span>
                                </label>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="" className="form-label">Nama Kategori</label>
                            <input
                                type="date"
                                className={`input max-w-full ${errors.categoriName && "input-error"}`}
                                required
                                placeholder="IOT"
                                name="deadline"
                                value={form.deadline}
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
                                value={form.description}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                </>
            } />
        </>
    );
}