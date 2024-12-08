'use client'

import TablePagination from "@/components/Table/TablePagination";
import { fetcher } from "@/lib/api";
import { Assessment, Proposal, Team } from "@/lib/types";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";
import DetailFile from "./DetailFile";
import DeleteProposal from "./DeleteProposal";
import ApproveProposal from "./ApproveProposal";

export default function DataProsals() {
    const { data: data, error } = useSWR("/api/v1/proposals", fetcher);
    if (error) { console.log("terjadi masalah saat mengambil data.") }

    const proposals: Proposal[] = data?.data || [];

    return (
        <>
            <TablePagination
                loading={!data}
                data={proposals}
                columns={[
                    { header: "No", key: null, render: (row, index) => index + 1 },
                    {
                        header: "Nama Tim",
                        key: null,
                        render:
                            (row) => {
                                const team: Team = row.team;
                                return team.name
                            }
                    },
                    {
                        header: "Status",
                        key: "status"
                    },
                    {
                        header: "Proposal Link",
                        key: null,
                        render: (row) => {
                            return (
                                <a href={row.fileLink} target="_blank" className="link-primary max-w-max flex items-center gap-1">
                                    lihat proposal
                                    <FontAwesomeIcon icon={faLink} />
                                </a>
                            )
                        }
                    },
                    {
                        header: "Aksi",
                        key: null,
                        render: (row) => {
                            return (
                                <div className="flex gap-3">
                                    <DeleteProposal id={row.id!} />
                                    <DetailFile data={row} />
                                    <ApproveProposal data={row} />
                                </div>
                            )
                        }
                    }
                ]}
            />
        </>
    );
}