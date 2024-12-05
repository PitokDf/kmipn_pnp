'use client'

import { fetcher } from "@/lib/api";
import { teamMember1 } from "@/lib/types";
import useSWR from "swr";

export default function DataTeam() {
    const { data: data, error } = useSWR("/api/v1/team-member", fetcher);

    if (error) {
        console.log('terjadi masalah'); return;
    }

    if (!data) {
        console.log("loading data");
        return
    }
    const teamData: teamMember1 = data.data;
    return (
        <>
            <div className="grid grid-cols-1 mb-3">
                <h2 className="text-lg">Informasi Dosen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <span className="text-sm"><strong>Nama Dosen:</strong> {teamData.lectureName}</span>
                    <span className="text-sm md:text-end"><strong>NIDN/NIP Dosen:</strong> {teamData.lectureNip}</span>
                </div>
            </div>
            <div className="divider my-0"></div>
            <div className="grid grid-cols-1 mb-3">
                <h2 className="text-lg mb-3">Anggota Tim</h2>
                <div className="flex w-full overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-[black_important!]">
                                <th>Nama</th>
                                <th>NIM</th>
                                <th>Email</th>
                                <th>No WA</th>
                                <th>Program Studi</th>
                                <th>KTM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teamData.teamMembers?.map((member, index) => (
                                    <tr key={"members-" + index}>
                                        <td>{member.name} {member.role !== "member" && "(Ketua)"}</td>
                                        <td>{member.nim}</td>
                                        <td>{member.email}</td>
                                        <td>{member.nim}</td>
                                        <td>{member.prodi}</td>
                                        <td>
                                            <a href={member.fileKTM} className="link link-primary" target="_blank">{member.fileKTM.split("/")[4]}</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}