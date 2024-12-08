'use client'

import TablePagination from "@/components/Table/TablePagination";
import { fetcher } from "@/lib/api";
import { submission, Team } from "@/lib/types";
import useSWR from "swr";
import ApproveSubmision from "./ApproveSubmission";

export default function DataSubmissions() {
    const { data: data, error } = useSWR("/api/v1/submissions", fetcher);

    if (error) { console.log("terjadi masalah saat mengambil data.") }

    const submissions: submission[] = data?.data || [];

    return (
        <>
            <TablePagination
                data={submissions}
                loading={!data}
                columns={[
                    { header: "No", key: null, render: (row, index) => index + 1 },
                    { header: "Status", key: "status" },
                    {
                        header: "Nama Team", key: null, render: (row) => {
                            const team: Team = row.team;
                            return team.name
                        }
                    },
                    {
                        header: "Ronde", key: null, render(row, index) {
                            return row.status === "pending" ? "Pending" : row.round
                        },
                    },
                    {
                        header: "Aksi",
                        key: null,
                        render: (row) => {
                            return (
                                <div className="flex gap-3">
                                    <ApproveSubmision data={row} />
                                </div>
                            )
                        }
                    }
                ]}
            />
        </>
    );
}