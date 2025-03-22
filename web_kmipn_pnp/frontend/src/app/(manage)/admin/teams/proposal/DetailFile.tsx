import ModalCustom from "@/components/modal/Modal";
import { formatDate } from "@/lib/others_required";
import { File, Proposal } from "@/lib/types";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function DetailFile({ data }: { data: Proposal }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);
    const file: File = data.file;
    return (
        <>
            <button className="btn btn-sm btn-solid-primary" onClick={handleModal}>
                <FontAwesomeIcon icon={faInfo} />
            </button>
            <ModalCustom
                isOpen={isOpen}
                onClose={handleModal}
                title="Detail Proposal"
                children={
                    <>
                        <div className="grid grid-cols-[1fr_2fr] gap-3 mb-6">
                            <span className="text-base font-semibold">Ukuran File</span>
                            <span className="text-base font-medium">{Math.round((file.fileSize / 100000) * 10) / 100} MB</span>
                            <span className="text-base font-semibold">File Mimetype</span>
                            <span className="text-base font-medium">{file.type}</span>
                            <span className="text-base font-semibold">Original Name</span>
                            <span className="text-base font-medium max-w-full text-wrap">{file.originalName}</span>
                            <span className="text-base font-semibold">Diupload Pada</span>
                            <span className="text-base font-medium">{formatDate(file.createdAt)}</span>
                            <span className="text-base font-semibold">Status</span>
                            <span className="text-base font-medium">{data.status}</span>
                            <span className="text-base font-semibold">Catatan</span>
                            <span className="text-base font-medium">{data.comments ?? "~"}</span>
                        </div>
                        <div className="flex justify-end">
                            <button className="btn btn-sm btn-secondary rounded-md" onClick={handleModal}>Close</button>
                        </div>
                    </>
                }
            />
        </>
    );
}