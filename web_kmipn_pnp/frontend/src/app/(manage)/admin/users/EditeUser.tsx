"use client";

import { useState } from "react";
import ModalUser from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { mutate } from "swr";
import { User } from "@/lib/types";

export default function EditeUser({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [form, setForm] = useState({ nama: user.name, email: user.email, role: user.role, password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputErrors, setInputErrors] = useState({ nama: null, email: null, role: null, password: null })

    const handleModal = () => { setIsOpen(!isOpen); }

    const handleInputChange = (field: "nama" | "email" | "role" | "password", value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const clear = () => {
        setInputErrors({ nama: null, email: null, role: null, password: null });
        setIsOpen(!isOpen);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.put(`/api/v1/users/${user.id}`, form, { headers: { "Content-Type": "application/json" } });
            console.log(response);

            if (response.status === 200) {
                toast.success(response.data.msg);
                clear();
                mutate("/api/v1/users")
            }
        } catch (error: any) {
            console.log(error);

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
                className="btn btn-sm btn-solid-warning btn-rounded gap-2"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </button>

            <ModalUser
                form={form}
                data={user}
                handleInputChange={handleInputChange}
                handleSubmit={(e) => handleSubmit(e)}
                isOpen={isOpen} onClose={handleModal}
                title="Update User"
                errors={inputErrors}
                actions={
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn btn-sm btn-primary ${isLoading && "btn-loading"}`}>
                        {isLoading ? "Mengupdate..." : "Update"}
                    </button>
                }
            />
        </div>
    );
}