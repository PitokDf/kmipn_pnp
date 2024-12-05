import ModalConfirmation from "@/components/modal/ModalConfirmation";
import { api } from "@/lib/api";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function VerifikasiTeam({ teamId }: { teamId: number }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleModal = () => { setIsOpen(!isOpen) }

    const handleVerifikasi = async () => {
        try {
            setIsLoading(true)
            const response = await api.put(`/api/v1/team-member/${teamId}`);
            if (response.status === 200) {
                toast.success(response.data.msg)
                mutate("/api/v1/all-team-member")
                handleModal();
            }
        } catch (error: any) {
            if (error.status === 400) {
                toast.error(error.response.data.msg)
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <button className="btn btn-sm btn-success rounded-md" onClick={handleModal}>verfikasi tim</button>
            <ModalConfirmation
                icon={faCheck}
                handleConfirmation={handleVerifikasi}
                isLoading={isLoading}
                isOpen={isOpen}
                onClose={handleModal}
                text="Verifikasi Tim Ini?"
                title="Verifikasi Team"
                labelConfirmation="Verifikasi"
            />
        </>
    )
}