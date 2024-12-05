import { HTMLAttributes, LegacyRef, ReactNode } from "react";

type ModalPops = {
    id: string,
    title: string,
    content: ReactNode,
    className?: HTMLAttributes<HTMLDivElement> | string,
    onClose: () => void,
    ref?: LegacyRef<HTMLInputElement> | undefined,
    actions: {
        label: string,
        className?: HTMLAttributes<HTMLDivElement> | string,
        disabled?: boolean,
        onClick: () => void
    }[]
}

export default function Modal({ id, title, content, className, onClose, ref, actions }: ModalPops) {
    return (
        <>
            <input className="modal-state" ref={ref} id={id} type="checkbox" />
            <div className={`modal ${className}`}>
                <label className="modal-overlay"></label>
                <div className="modal-content border border-gray-700 flex flex-col absolute min-w-full md:min-w-[550px] md:relative top-0 gap-5">
                    <label htmlFor={id} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</label>
                    <h2 className="text-xl">{title}</h2>
                    {content}
                    <div className="flex justify-end gap-3">
                        {actions.map((action, index) => (
                            <button type="button" disabled={action.disabled} key={"btnModal" + index} className={`${action.className} ${action.disabled && "btn-loading"}`} onClick={action.onClick}>
                                {action.disabled ? "Loading..." : action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}