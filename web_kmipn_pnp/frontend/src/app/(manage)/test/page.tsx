"use client"; // Gunakan "use client" untuk mendukung interaktivitas di App Router

import ModalCustom from "@/components/modal/Modal";
import TablePagination from "@/components/Table/TablePagination";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <TablePagination
                search={{ placeHolder: "Cari...", className: "input-primary" }}
                className={"table-compact"}
                data={[
                    { name: "Pito", kelas: "kelas" },
                    { name: "Pitokk", kelas: "kelas" },
                    { name: "Pitokkk", kelas: "kelas" }
                ]}
                columns={[
                    { header: "Nama", key: "name" },
                    { header: "kelas", key: "kelas" },
                    {
                        header: "Action",
                        key: null,
                        className: "flex justify-center",
                        render: (row) => <button onClick={() => { alert(row.name) }} className="btn btn-sm">ini btn</button>
                    }
                ]}
            />
            <div className="p-6">
                {/* Tombol Buka Modal */}
                <button
                    onClick={openModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Open Modal
                </button>

                {/* Modal */}
                {createPortal(
                    <ModalCustom isOpen={isModalOpen} onClose={closeModal} title="My Modal">
                        <p>
                            This is a reusable modal! You can put any content here, such
                            as forms or other components.
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                    </ModalCustom>,
                    document.body
                )}
            </div>
        </>
    );
}
