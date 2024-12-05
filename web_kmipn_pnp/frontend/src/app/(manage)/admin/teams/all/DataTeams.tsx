'use client'

import TablePagination from "@/components/Table/TablePagination";
import { fetcher } from "@/lib/api";
import { teamMemberType } from "@/lib/types";
import useSWR from "swr";
import DetailTeam from "./DetailTeam";

export default function DataTeams() {
    const { data: data, error } = useSWR("/api/v1/all-team-member", fetcher);

    if (!data) { console.log("loading"); return }
    if (error) { console.log("terjadi kesalahan"); return }
    console.log(data);

    const teams: teamMemberType[] = data.data;
    const filterTeams = teams.map((team, index) => ({
        ...team
    }));

    return (
        <>
            <TablePagination
                className={"table-compact"}
                data={filterTeams}
                columns={[
                    { header: "No", key: null, render: (row, index) => index + 1 },
                    { header: "Nama Tim", key: "teamName" },
                    { header: "Submission", key: null, render: (row) => { return row.statusSubmission ? row.statusSubmission : "pending" } },
                    { header: "Asal Politeknik", key: "institution" },
                    { header: "Dosen Pendamping", key: "lectureName" },
                    {
                        header: "Status", key: null,
                        render: (row) => (
                            row.verified ? <div className="badge badge-sm badge-success">Verified</div> :
                                <div className="badge badge-sm badge-warning">Unverified</div>
                        )
                    },
                    {
                        header: "Aksi", key: null,
                        className: "flex justify-center gap-3",
                        render: (row) => {
                            return (
                                <div>
                                    {<DetailTeam teamMember={row} />}
                                </div>
                            )
                        }
                    },
                ]}
            />
        </>
    );
}