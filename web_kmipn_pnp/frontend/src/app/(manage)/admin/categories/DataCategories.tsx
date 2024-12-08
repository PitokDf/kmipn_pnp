'use client'

import { fetcher } from "@/lib/api";
import { Categories } from "@/lib/types";
import useSWR from "swr";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import TablePagination from "@/components/Table/TablePagination";
import { formatDate } from "@/lib/others_required";

export default function DataCategories() {
    const { data: data, error } = useSWR("/api/v1/categories-close", fetcher);

    if (error) {
        console.log("Terjadi masalah saat mengambil data.");
        return
    }

    const categories: Categories[] = data?.data || [];
    const filterCategories = categories.map((category) => ({
        ...category,
        description: category.description || "~"
    }));

    return (
        <>
            <TablePagination
                loading={!data}
                className={"table-compact"}
                data={filterCategories}
                columns={[
                    { header: "No", key: null, render: (row, index) => index + 1 },
                    { header: "Nama Kategori", key: "categoriName" },
                    {
                        header: "Deadline", key: null, render(row, index) {
                            return formatDate(row.deadline);
                        },
                    },
                    { header: "Deskripsi", key: "description" },
                    {
                        header: "Aksi", key: null,
                        className: "flex gap-2",
                        render: (row) => (
                            <>
                                <EditCategory data={row} />
                                <DeleteCategory data={row} />
                            </>
                        )
                    },
                ]}
            />
        </>
    );
}