import ModalCustom from "@/components/modal/Modal";
import { User } from "@/lib/types";
import React from "react";
import { createPortal } from "react-dom";

type ModalUserProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleInputChange: (field: "nama" | "email" | "role" | "password", value: string) => void;
    form: { nama: string, email: string, role: string, password: string };
    actions: React.ReactNode,
    data?: User,
    errors?: { nama: string | null, email: string | null, role: string | null, password: string | null }
}
export default function ModalUser({ isOpen, title, onClose, handleSubmit, handleInputChange, form, actions, data, errors }: ModalUserProps) {
    return createPortal(
        <ModalCustom isOpen={isOpen} title={title} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-6">
                    <div className="form-field">
                        <label htmlFor="name">Nama Lengkap</label>
                        <input
                            value={form?.nama}
                            onChange={e => handleInputChange("nama", e.target.value)}
                            type="text"
                            className={`input max-w-full ${errors?.nama && "input-error"}`}
                            name="nama"
                            placeholder="exp: Pitooo"
                        />
                        {
                            errors?.nama && (
                                <label className="form-label">
                                    <span className="form-label-alt text-error">{errors.nama}</span>
                                </label>
                            )
                        }
                    </div>
                    <div className="form-field">
                        <label htmlFor="name">Email</label>
                        <input
                            value={form?.email ?? (data && data?.email)}
                            onChange={e => handleInputChange("email", e.target.value)}
                            type="email"
                            placeholder="exp: example@gmail.com"
                            className={`input max-w-full ${errors?.email && "input-error"}`}
                            name="email" />
                        {
                            errors?.email && (
                                <label className="form-label">
                                    <span className="form-label-alt text-error">{errors.email}</span>
                                </label>
                            )
                        }
                    </div>
                    <div className="form-field">
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role"
                            value={form?.role}
                            onChange={e => handleInputChange("role", e.target.value)}
                            className={`select max-w-full ${errors?.role && "select-error"}`}
                        >
                            <option value="">-- pilih role --</option>
                            <option value="admin">Admin</option>
                            <option value="juri">Juri</option>
                        </select>
                        {
                            errors?.role && (
                                <label className="form-label">
                                    <span className="form-label-alt text-error">{errors.role}</span>
                                </label>
                            )
                        }
                    </div>
                    <div className="form-field">
                        <label htmlFor="name">Password</label>
                        <input
                            value={form?.password}
                            onChange={e => handleInputChange("password", e.target.value)}
                            type="password"
                            placeholder="********"
                            className={`input max-w-full ${errors?.password && "input-error"}`}
                            name="password"
                        />
                        {
                            errors?.password && (
                                <label className="form-label">
                                    <span className="form-label-alt text-error">{errors.password}</span>
                                </label>
                            )
                        }
                    </div>
                </div>
                <div className="flex justify-end">
                    {actions}
                </div>
            </form>
        </ModalCustom>,
        document.body
    )
}