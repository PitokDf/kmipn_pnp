import React, { HTMLAttributes, useState } from "react";

type Column<T> = {
    header: string;
    key?: keyof T | null;
    className?: HTMLAttributes<HTMLDivElement> | string;
    render?: (row: T, index: number) => React.ReactNode;
};

type TableProps<T extends Record<string, React.ReactNode>> = {
    data: T[];
    columns: Column<T>[];
    className?: HTMLAttributes<HTMLDivElement> | string;
    loading?: boolean;
    emptyState?: string;
    search?: {
        placeHolder: string;
        className?: HTMLAttributes<HTMLDivElement> | string;
    }
}

const skeletonLength = Array.from({ length: 5 })

export default function TablePagination<T extends Record<string, React.ReactNode>>({
    data,
    columns,
    className,
    loading = false,
    emptyState = "No data available in table.",
    search
}: TableProps<T>) {
    if (loading) return (
        <>
            <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="skeleton h-6 w-12 rounded-lg"></div>
                    <div className="skeleton h-7 w-12 rounded-lg"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="skeleton h-6 w-12 rounded-lg"></div>
                    <div className="skeleton h-7 w-48 rounded-lg"></div>
                </div>
            </div>
            <div className="flex w-full overflow-x-auto">
                <table className={`table ${className}`}>
                    <thead>
                        <tr>
                            {
                                columns.map((col, index) => (
                                    <th key={index}>
                                        <div className="skeleton h-5 rounded-md"></div>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            skeletonLength.map((col, index) => (
                                <tr key={index}>
                                    {
                                        columns.map((col, index) => (
                                            <th key={index}>
                                                <div className="skeleton h-5 rounded-md"></div>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

    const [searchKey, setSearchKey] = useState<string>("");
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filterData = data.filter(
        (item) =>
            Object.values(item).some(
                (value) => typeof value === "string" &&
                    value.toLowerCase().includes(searchKey.toLowerCase())
            )
    )

    const paginationData = filterData.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);
    const totalPages = Math.ceil(filterData.length / itemPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }


    return (
        <>
            <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                    <label htmlFor="per_page">page: </label>
                    <select
                        className="input max-w-max"
                        value={itemPerPage}
                        onChange={e => { setItemPerPage(Number(e.target.value)); setCurrentPage(1) }}
                        name="per_page" id="per_page">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="flex gap-2 items-center">
                    <label htmlFor="search-box" className="form-label">Cari: </label>
                    <input
                        type="text"
                        className={`input max-w-max ${search && search.className}`}
                        placeholder={`${search ? search.placeHolder : "Search"}`}
                        value={searchKey}
                        id="search-box"
                        onChange={e => setSearchKey(e.target.value)} />
                </div>
            </div>
            <div className="flex w-full overflow-x-auto">
                <table className={`table ${className}`}>
                    <thead>
                        <tr>
                            {
                                columns.map((col, index) => (
                                    <th key={index}>
                                        {col.header}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginationData.length === 0 ? (
                                <tr className="text-center">
                                    <td colSpan={columns.length} style={{ textAlign: "center" }}>{data.length === 0 ? emptyState : "No data found."} </td>
                                </tr>
                            ) :
                                paginationData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {
                                            columns.map((col, colIndex) => (
                                                <td key={colIndex} className={`${col.className}`}>
                                                    {col.render ? col.render(row, (currentPage - 1) * itemPerPage + rowIndex) : (row[col.key as keyof T] as React.ReactNode)}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                )
                                )
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination mt-3">
                <button className="btn btn-sm" onClick={() => handlePageChange(currentPage - 1)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z" fill="#969696" />
                    </svg>
                </button>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button key={"btn_pagination_" + index} onClick={() => handlePageChange(index + 1)} className={`btn btn-sm ${currentPage === index + 1 && "btn-active"}`}>{index + 1}</button>
                    ))
                }
                <button className="btn btn-sm" onClick={() => handlePageChange(currentPage + 1)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.74375 5.2448C7.41875 5.5698 7.41875 6.0948 7.74375 6.4198L10.9771 9.65314L7.74375 12.8865C7.41875 13.2115 7.41875 13.7365 7.74375 14.0615C8.06875 14.3865 8.59375 14.3865 8.91875 14.0615L12.7437 10.2365C13.0687 9.91147 13.0687 9.38647 12.7437 9.06147L8.91875 5.23647C8.60208 4.9198 8.06875 4.9198 7.74375 5.2448Z" fill="#969696" />
                    </svg>
                </button>
            </div>
        </>
    )
}