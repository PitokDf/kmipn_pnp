'use client'

import { api, fetcher } from "@/lib/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import OptionCategoryLomba from "./OptionCategoriLomba";
import OptionListPerguruanTinggi from "./OptionPerguruanTinggi";
import { signOut, useSession } from "next-auth/react";

import { toast } from "react-toastify";
import useSWR from "swr";

export default function CompleteTeamForm() {
    const { data: session, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [dataTeams, setDataTeams] = useState({ nama_tim: "sww", kategori: "", asal_pt: "", dosen_pedamping: "dsad", nip_dosen: "222222222222" });
    const [teamMembers, setTeamMembers] = useState([
        { nama_anggota: 'ini', nim: '222222', no_wa: '084123123', email: 'test@gmail.com', prodi: 'trpl', foto_ktm: null as File | null },
        { nama_anggota: 'ini', nim: '222222', no_wa: '084123123', email: 'test@gmail.com', prodi: 'trpl', foto_ktm: null as File | null }
    ]);
    const memberInput = { nama_anggota: 'ini', nim: '222222', no_wa: '084123123', email: 'test@gmail.com', prodi: 'trpl', foto_ktm: null as File | null };

    const { data: data } = useSWR("/api/v1/check-team-compleate", fetcher);
    const checked = data ? data.complete : false;

    // iko untuk cek kalau partisipan sudah mengisi form dan valid semua datanya, sedangkan di tab lain di masih membuka halaman ini, maka otomatis di keluarkan dari sistem
    if (checked) {
        signOut();
        return
    }

    const handleDataTeamChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setDataTeams({
            ...dataTeams,
            [e.target.name]: e.target.value
        });
    }

    const handleInputChange =
        (index: number, field: 'nama_anggota' | 'nim' | 'no_wa' | 'email' | 'prodi' | 'foto_ktm', value: File | string) => {
            const newTeamMembers = [...teamMembers];
            if (field === "foto_ktm") {
                // Validasi tipe file
                const file = value as File;
                if (file && !['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
                    alert('Hanya file gambar yang diperbolehkan (JPEG, PNG, JPG, WEBP).');
                    return;
                }
                newTeamMembers[index][field] = file;
            } else {
                if (field === "nim" && (value as string).length > 10) {
                    return; // Batasi panjang nim
                }
                newTeamMembers[index][field] = value as string;
            }
            setTeamMembers(newTeamMembers)
        }

    const handleAddOrDeleteMoreMember = () => {
        if (teamMembers.length === 3) {
            setTeamMembers((prev) => prev.slice(0, -1))
        } else {
            setTeamMembers((prev) => [
                ...prev,
                { ...memberInput }
            ])
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const files = teamMembers.map(member => member.foto_ktm);
            const data = {
                nama_dosen: dataTeams.dosen_pedamping,
                nip_dosen: dataTeams.nip_dosen,
                nama_tim: dataTeams.nama_tim,
                kategori_lomba: Number(dataTeams.kategori),
                asal_politeknik: dataTeams.asal_pt,
                members: teamMembers.map((member) => {
                    const { foto_ktm, ...noKtm } = member;
                    return noKtm;
                }),
                ktm_agg1: files[0],
                ktm_agg2: files[1],
                ktm_agg3: files[2],
            }

            const response = await api.post(`/api/v1/save-team-member?type=ktm`, data, { headers: { "Content-Type": "multipart/form-data" } });
            if (response.status === 201) {
                toast.success("Data team berhasil disimpan.");
                await update();
                setInterval(() => {
                    window.location.href = "/participant";
                }, 1500);
            }
        } catch (error) {
            toast.success("Terdapat masalah yang tidak diketahui, silahkan coba lagi nanti.");
            console.log(error);
        } finally { setIsLoading(false) }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="card p-5 border-l-2 border-l-blue-500 mb-6 rounded-md">
                    <h1 className="font-bold text-xl mb-5">Lengkapi Data Tim</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="form-group mb-3">
                            <div className="form-field">
                                <label htmlFor="nama_tim">Nama Tim</label>
                                <input
                                    id="nama_tim"
                                    name="nama_tim"
                                    placeholder="exp: Coba Aja Dulu"
                                    type="text"
                                    className="input max-w-full"
                                    onChange={(e) => handleDataTeamChange(e)}
                                    value={dataTeams.nama_tim}
                                />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="form-field">
                                <label htmlFor="kategori">Kategori Lomba</label>
                                <OptionCategoryLomba
                                    onChange={(e) => handleDataTeamChange(e)}
                                    value={dataTeams.kategori}
                                    name="kategori"
                                    id="kategori"
                                    className="max-w-full input-primary" />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="form-field">
                                <label htmlFor="asal_pt">Asal Politeknik</label>
                                <OptionListPerguruanTinggi
                                    onChange={(e) => handleDataTeamChange(e)}
                                    value={dataTeams.asal_pt}
                                    name="asal_pt"
                                    id="asal_pt"
                                    className="max-w-full" />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="form-field">
                                <label htmlFor="dosen_pedamping">Dosen Pendamping</label>
                                <input
                                    name="dosen_pedamping"
                                    id="dosen_pedamping"
                                    onChange={(e) => handleDataTeamChange(e)}
                                    value={dataTeams.dosen_pedamping}
                                    placeholder="exp: Pito Desri Pauzi Str"
                                    type="text"
                                    className="input max-w-full" />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="form-field">
                                <label htmlFor="nip_dosen">NIP/NIDN Dosen</label>
                                <input
                                    onChange={(e) => Number(e.target.value.length) <= 18 && (/^\d*$/.test(e.target.value)) ? handleDataTeamChange(e) : {}}
                                    value={dataTeams.nip_dosen}
                                    name="nip_dosen"
                                    id="nip_dosen"
                                    placeholder="exp: 2003121220260707"
                                    type="text"
                                    className="input max-w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card p-5 border-l-2 border-l-blue-500 rounded-md">
                    <h1 className="font-bold text-xl mb-5">Lengkapi Data Anggota</h1>
                    {teamMembers.map((member, index) => (
                        <div key={"member-form-" + index} className={`border-b-2 border-gray-300 dark:border-gray-500 ${index !== 0 ? "mt-3" : ""}`}>
                            <h1 className="font-semibold text-md mb-2">Anggota {index + 1} {index === 0 ? "(Ketua)" : ""}</h1>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="form-group mb-3">
                                    <div className="form-field">
                                        <label htmlFor="team_name">Nama Anggota</label>
                                        <input
                                            placeholder={`Nama Anggota ${index + 1}`}
                                            type="text"
                                            value={member.nama_anggota}
                                            onChange={(e) => handleInputChange(index, "nama_anggota", e.target.value)}
                                            required
                                            className="input max-w-full"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="form-field">
                                        <label htmlFor="team_name">NIM</label>
                                        <input
                                            placeholder={`NIM Anggota ${index + 1}`}
                                            type="text"
                                            value={member.nim}
                                            onChange={(e) => (/^\d*$/.test(e.target.value)) && handleInputChange(index, "nim", e.target.value)}
                                            required
                                            className="input max-w-full"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="form-field">
                                        <label htmlFor="team_name">Email</label>
                                        <input
                                            placeholder={`Email Anggota ${index + 1}`}
                                            type="email"
                                            value={member.email}
                                            onChange={(e) => handleInputChange(index, "email", e.target.value)}
                                            required
                                            className="input max-w-full"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="form-field">
                                        <label htmlFor="team_name">No WhatsApp</label>
                                        <input
                                            placeholder={`No Wa Anggota ${index + 1}`}
                                            type="number"
                                            value={member.no_wa}
                                            onChange={(e) => handleInputChange(index, "no_wa", e.target.value)}
                                            required
                                            className="input max-w-full"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="form-field">
                                        <label htmlFor="team_name">Prodi</label>
                                        <input
                                            placeholder={`Prodi Anggota ${index + 1}`}
                                            type="text"
                                            value={member.prodi}
                                            onChange={(e) => handleInputChange(index, "prodi", e.target.value)}
                                            required
                                            className="input max-w-full"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="form-field">
                                        <label htmlFor="team_name">Foto KTM</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleInputChange(index, "foto_ktm", e.target.files?.[0] || "")}
                                            required
                                            accept="image/jpeg,png"
                                            className="input-file max-w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOrDeleteMoreMember} className={`btn btn-md mt-3 ${teamMembers.length === 3 ? 'btn-error' : 'btn-success'} w-full`}>{teamMembers.length === 3 ? "Delete row" : "Add more"}</button>
                </div>
                <div className="">
                    <button type="submit" className={`btn btn-md btn-warning mt-3 ${isLoading && 'btn-loading'} w-full`}>{isLoading ? "Submiting..." : "Submit"}</button>
                </div>
            </form>
        </div>
    );
}