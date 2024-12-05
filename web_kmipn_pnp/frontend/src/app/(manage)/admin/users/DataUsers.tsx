'use client'

import TablePagination from "@/components/Table/TablePagination";
import { api, fetcher } from "@/lib/api";
import { User } from "@/lib/types";
import useSWR from "swr";
import EditeUser from "./EditeUser";
import DeleteUser from "./DeleteUser";

export default function DataUsers() {
    const { data: data, error } = useSWR("/api/v1/users", fetcher);

    if (!data) { console.log("loading"); return }
    if (error) { console.log("terjadi kesalahan"); return }

    const users: User[] = data.data;
    const filterUsers = users.map((user) => ({
        ...user
    }));

    return (
        <div>
            <TablePagination
                className={"table-compact"}
                data={filterUsers}
                columns={[
                    { header: "No", key: null, render: (row, index) => index + 1 },
                    { header: "Nama Pengguna", key: "name" },
                    { header: "Email", key: "email" },
                    { header: "Role", key: "role" },
                    {
                        header: "verified", key: null,
                        render: (row) => (
                            row.verified ? <div className="badge badge-sm badge-success">Verified</div> :
                                <div className="badge badge-sm badge-warning">Unverified</div>
                        )
                    },
                    {
                        header: "Aksi", key: null,
                        className: "flex justify-center gap-3",
                        render: (row) =>
                            <>
                                <EditeUser user={row} />
                                <DeleteUser data={row} />
                            </>
                    },
                ]}
            />
        </div>
    );
}