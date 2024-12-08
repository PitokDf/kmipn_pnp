'use client'

import { api } from "@/lib/api";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export default function DownloadProposal() {
    const handleDownload = async () => {
        try {
            const res = await api.get("/api/v1/download-proposal", {
                responseType: "blob"
            });

            const blob = new Blob([res.data], { type: "application/zip" });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "approved-proposals.zip";
            link.click();

            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.log(error);
            toast.error("ada masalah hei!")
        }
    }
    return (
        <button className="btn btn-sm btn-secondary gap-2" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} /> Approve Proposal
        </button>
    );
}