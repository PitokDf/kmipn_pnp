import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalCustom from "./Modal";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { createPortal } from "react-dom";

type ModalConfirmationProps = {
    isOpen: boolean;
    onClose: () => void;
    icon: IconProp;
    isLoading: boolean;
    handleConfirmation: () => void;
    labelConfirmation?: string;
    text: string;
    title?: string;
}
export default function ModalConfirmation(
    { isOpen, onClose, icon, isLoading, handleConfirmation, labelConfirmation, text, title }
        : ModalConfirmationProps) {
    return (
        <div>
            {createPortal(
                <ModalCustom
                    isOpen={isOpen}
                    onClose={onClose}
                    title={title || "Confirmation"}
                    children={
                        <div className="flex flex-col justify-center gap-3">
                            <FontAwesomeIcon icon={icon} size="6x" />
                            <span className="text-center text-xl font-medium">{text}</span>
                            <div className="flex gap-6 mt-6">
                                <button className="btn w-full rounded-md" onClick={onClose}>Batal</button>
                                <button disabled={isLoading}
                                    className={`btn btn-error w-full rounded-md flex gap-5 ${isLoading && "btn-loading"}`}
                                    onClick={handleConfirmation}
                                >
                                    {labelConfirmation ?? "Confirm"}
                                </button>
                            </div>
                        </div>
                    }
                />, document.body
            )}
        </div>
    );
}