import ModalCustom from "@/components/modal/Modal";
import { api } from "@/lib/api";
import { Proposal } from "@/lib/types";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function ApproveProposal({ data }: { data: Proposal }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setform] = useState({ status: "approve", comments: "" })
    const handleModal = () => setIsOpen(!isOpen);
    const handleInputChange = (e: ChangeEvent<any>) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleApprove = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.put(`/api/v1/proposals/${data.id}`, form);
            if (response.status === 200) {
                toast.success("Proses berhasil")
                handleModal();
                mutate("/api/v1/proposals")
            }
        } catch (error) {
            toast.error("Terjadi masalah!.")
            console.log(error);

        } finally { setIsLoading(false) }
    }
    return (
        <>
            <button onClick={handleModal} disabled={data.status !== "pending" ? true : false} className="btn btn-sm btn-solid-success">
                <FontAwesomeIcon icon={faCheckCircle} />
            </button>
            <ModalCustom
                isOpen={isOpen}
                onClose={handleModal}
                title="Approve Proposal"
                children={
                    <form onSubmit={handleApprove}>
                        <div>
                            <div className="form-group mb-6">
                                <div className="form-field">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="select max-w-full"
                                        value={form.status}
                                        onChange={e => handleInputChange(e)}
                                    >
                                        <option value="approve">Approve</option>
                                        <option value="rejected">Reject</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="comments">Catatan</label>
                                    <input
                                        type="text"
                                        name="comments"
                                        placeholder="Catatan"
                                        className="select max-w-full"
                                        value={form.comments}
                                        onChange={e => handleInputChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className={`btn btn-sm btn-error rounded-md ${isLoading && "btn-loading"}`} disabled={isLoading}>{isLoading ? "Loading..." : "Simpan"}</button>
                        </div>
                    </form>
                }
            />
        </>
    )
}