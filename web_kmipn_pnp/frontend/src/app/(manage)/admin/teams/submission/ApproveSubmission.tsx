import ModalCustom from "@/components/modal/Modal";
import { api } from "@/lib/api";
import { handleInputChange } from "@/lib/others_required";
import { Proposal, submission } from "@/lib/types";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function ApproveSubmision({ data }: { data: submission }) {
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
            const response = await api.put(`/api/v1/submissions/${data.id}`, form);
            if (response.status === 200) {
                toast.success("submissions berhasil di update")
                handleModal();
                mutate("/api/v1/submissions")
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
                                        <option value="passed">Lanjut</option>
                                        <option value="failed">Gagal</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="comments">Ronde</label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="select max-w-full"
                                        value={form.status}
                                        onChange={e => handleInputChange(e)}
                                    >
                                        <option value="preliminary">Penyisihan</option>
                                        <option value="final">Final</option>
                                    </select>
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