"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Members, teamMemberType } from "@/lib/types";
import ModalCustom from "@/components/modal/Modal";
import VerifikasiTeam from "./VerifikasiTeam";
import FotoKTM from "./FotoKtm";

export default function DetailTeam({ teamMember }: { teamMember: teamMemberType }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const members: Members[] = teamMember.teamMembers;
    const handleModal = () => { setIsOpen(!isOpen) }


    return (
        <div>
            <button
                onClick={handleModal}
                className="btn btn-sm btn-solid-success rounded-full gap-2"
            >
                <FontAwesomeIcon icon={faCheck} />
            </button>

            <ModalCustom
                isOpen={isOpen}
                onClose={handleModal}
                title="Detail Tim"
                children={
                    <>
                        <div className="grid grid-cols-[1fr_2fr] gap-3 mb-6">
                            <span className="text-base font-semibold">Nama Tim </span>
                            <span className="text-base font-medium">: {teamMember.teamName}</span>
                            <span className="text-base font-semibold">Kategori Lomba </span>
                            <span className="text-base font-medium">: {teamMember.categori}</span>
                            <span className="text-base font-semibold">Politeknik Asal</span>
                            <span className="text-base font-medium">: {teamMember.institution}</span>
                            <span className="text-base font-semibold">Jumlah Anggota</span>
                            <span className="text-base font-medium">: {teamMember.teamMembers.length}</span>
                            <span className="text-base font-semibold">Dosen Pendamping</span>
                            <span className="text-base font-medium">: {teamMember.lectureName} ({teamMember.lectureNip})</span>
                        </div>
                        <h1 className="text-lg font-bold mb-3">Detail Anggota</h1>
                        <div className="grid grid-cols-[1fr_2fr] gap-3 mb-2">
                            {
                                members.map((member, index) => (
                                    <React.Fragment key={`member-${index}`}>
                                        <span className="text-base font-semibold">Nama Anggota - {index + 1}</span>
                                        <span className="text-base font-medium">: {member.name} {member.role === "leader" && "(Ketua)"}</span>
                                        <span className="text-base font-semibold">NIM  </span>
                                        <span className="text-base font-medium">: {member.nim}</span>
                                        <span className="text-base font-semibold">Prodi  </span>
                                        <span className="text-base font-medium">: {member.prodi}</span>
                                        <span className="text-base font-semibold">Foto KTM  </span>
                                        <FotoKTM imageUrl={member.fileKTM} />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className="flex pt-2 border-t border-t-slate-500 justify-end">
                            {teamMember.verified === "false" ?
                                <VerifikasiTeam teamId={teamMember.id!} /> :
                                <button className="btn btn-sm btn-ghost rounded-md cursor-not-allowed" type="button">Sudah Diverifikasi</button>
                            }
                        </div>
                    </>
                }
            />
        </div>
    );
}