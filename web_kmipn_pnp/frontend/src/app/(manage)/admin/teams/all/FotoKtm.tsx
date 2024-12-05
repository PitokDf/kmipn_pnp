import ModalCustom from "@/components/modal/Modal";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function FotoKTM({ imageUrl }: { imageUrl: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => setIsOpen(!isOpen);
    return (
        <div>
            : <button className="link-primary" onClick={handleModal}>
                lihat foto   <FontAwesomeIcon icon={faFileImage} />
            </button>
            <ModalCustom
                isOpen={isOpen}
                onClose={handleModal}
                title="Foto KTM"
                children={
                    <>
                        <Image src={imageUrl} alt="foto ktm" width={500} height={500} className="w-full" />
                        <div className="flex mt-3 justify-end">
                            <button className="btn btn-sm btn-success" onClick={handleModal}>close</button>
                        </div>
                    </>
                }
            />
        </div>
    );
}