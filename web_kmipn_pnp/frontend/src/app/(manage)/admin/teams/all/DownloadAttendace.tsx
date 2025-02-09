'use client'

import { api } from "@/lib/api";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export default function DownloadAttendace() {
    const handleDownload = async () => {
        try {
            const res = await api.get("/api/v1/team/attendace", {
                responseType: "blob"
            });

            const blob = new Blob([res.data], { type: "text/csv" });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "attendace.csv";
            link.click();

            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.log(error);
            toast.error("ada masalah hei!")
        }
    }
    return (
        <button className="btn btn-sm btn-secondary gap-2" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} /> Donwload Daftar Hadir
        </button>
    );
}