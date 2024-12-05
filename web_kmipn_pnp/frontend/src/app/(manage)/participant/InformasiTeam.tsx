'use client'

import UploadProposal from "@/components/form/UploadProposal";
import { fetcher } from "@/lib/api";
import { teamMemberType } from "@/lib/types";
import { faBarsStaggered, faFileAlt, faFlagCheckered, faMedal, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

export default function InformasiTeam() {
    const { data: data, error } = useSWR("/api/v1/team-member", fetcher);

    if (error) {
        console.log('terjadi masalah'); return;
    }

    if (!data) {
        console.log("loading data"); return;
    }

    const teamData: teamMemberType = data.data;
    console.log(teamData);

    return (
        <>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-row items-center justify-between border-l-2 border-l-blue-500 p-3 rounded-md card border-1 border-gray-300">
                    <div className="grid">
                        <h1 className="font-bold">Data Anggota</h1>
                        <span>{teamData.verified ? "Verified" : "Pending"}</span>
                    </div>
                    <FontAwesomeIcon className="opacity-70" icon={faUsers} size="2x" />
                </div>
                <div className="flex flex-row items-center justify-between border-l-2 border-l-blue-500 p-3 rounded-md card border-1 border-gray-300">
                    <div className="grid">
                        <h1 className="font-bold">Unggah Proposal</h1>
                        <span>{teamData.statusProposal}</span>
                    </div>
                    <FontAwesomeIcon className="opacity-70" icon={faFileAlt} size="2x" />
                </div>
                <div className="flex flex-row items-center justify-between border-l-2 border-l-blue-500 p-3 rounded-md card border-1 border-gray-300">
                    <div className="grid">
                        <h1 className="font-bold">Penyisihan</h1>
                        <span>{teamData.statusSubmission}</span>
                    </div>
                    <FontAwesomeIcon className="opacity-70" icon={faFlagCheckered} size="2x" />
                </div>
                <div className="flex flex-row items-center justify-between border-l-2 border-l-blue-500 p-3 rounded-md card border-1 border-gray-300">
                    <div className="grid">
                        <h1 className="font-bold">Final</h1>
                        <span>{teamData.round}</span>
                    </div>
                    <FontAwesomeIcon className="opacity-70" icon={faMedal} size="2x" />
                </div>
            </div>
            <div className="border-l-2 border-l-blue-500 p-3 rounded-md card">
                <div className="grid gap-5 grid-cols-1 md:grid-cols-[2fr_4fr]">
                    <h1 className="font-bold">Nama Tim</h1>
                    <span className="mb-2">{teamData.teamName}</span>
                    <h1 className="font-bold">Kategori Lomba</h1>
                    <span className="mb-2">{teamData.categori}</span>
                    <h1 className="font-bold">Asal Politeknik</h1>
                    <span className="mb-2">{teamData.institution}</span>
                    <h1 className="font-bold">Jumlah Anggota</h1>
                    <span className="mb-2">{teamData.teamMembers.length}</span>
                    <h1 className="font-bold">Dosen</h1>
                    <span className="mb-2">{teamData.lectureName} ({teamData.lectureNip})</span>
                    <h1 className="font-bold">Proposal</h1>
                    <span className="mb-2">
                        {
                            // teamData.verified ?
                            //     teamData.linkProposal ?
                            //         <a href={teamData.linkProposal} className="font-normal text-blue-600" target="_blank">
                            //             {teamData?.linkProposal.split('/')[4]}
                            //         </a> :
                            //         (teamData.isPrposalrejected ?
                            //             <>
                            //                 <span className="text-error">{teamData.reasonRejected}, upload ulang proposal!.</span>
                            //                 <UploadProposal />
                            //             </> :
                            //             <>
                            //                 <UploadProposal />
                            //             </>
                            //         ) :
                            //     <span className="text-warning">Menunggu diverifikasi admin.</span>
                            teamData.verified ?
                                (
                                    teamData.isPrposalrejected ?
                                        <>
                                            <span className="text-error">{teamData.reasonRejected}, upload ulang proposal!.</span>
                                            <UploadProposal />
                                        </>
                                        : (
                                            teamData.linkProposal ?
                                                <a href={teamData.linkProposal} className="font-normal text-blue-600" target="_blank">
                                                    {teamData?.linkProposal.split('/')[4]}
                                                </a> :
                                                <UploadProposal />
                                        )
                                ) :
                                <span className="text-warning">Menunggu diverifikasi admin.</span>
                        }
                    </span>
                </div>
            </div>
        </>
    );
}