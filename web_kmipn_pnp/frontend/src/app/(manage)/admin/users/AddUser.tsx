"use client";

import { useState } from "react";
import ModalUser from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { mutate } from "swr";

export default function AddUser() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [form, setForm] = useState({ nama: "", email: "", role: "", password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputErrors, setInputErrors] = useState({ nama: null, email: null, role: null, password: null })

    const handleModal = () => { setIsOpen(!isOpen) }

    const handleInputChange = (field: "nama" | "email" | "role" | "password", value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const clear = () => {
        setInputErrors({ nama: null, email: null, role: null, password: null });
        setForm({ nama: "", email: "", role: "", password: "" });
        setIsOpen(!isOpen);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.post("/api/v1/users", form, { headers: { "Content-Type": "application/json" } });

            if (response.status === 201) {
                toast.success(response.data.msg);
                clear();
                mutate("/api/v1/users")
            }
        } catch (error: any) {
            const errorCode = error.status;
            if (errorCode === 400) {
                const errors = error.response.data.errors;
                const newErrors: any = {};
                if (Array.isArray(errors)) {
                    errors.forEach((error) => {
                        newErrors[error.path] = error.msg
                    })
                }
                setInputErrors(newErrors);
            } else {
                toast.error("Terjadi masalah.");
            }
        } finally { setIsLoading(false) }
    }

    return (
        <div>
            <button
                onClick={handleModal}
                className="btn btn-sm btn-outline-success btn-rounded gap-2"
            >
                <FontAwesomeIcon icon={faAdd} />
                Add User
            </button>

            <ModalUser
                form={form}
                handleInputChange={handleInputChange}
                handleSubmit={(e) => handleSubmit(e)}
                isOpen={isOpen} onClose={handleModal}
                title="Add User"
                errors={inputErrors}
                actions={
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn btn-sm btn-primary ${isLoading && "btn-loading"}`}>
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </button>
                }
            />
        </div>
    );
}