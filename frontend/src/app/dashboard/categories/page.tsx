

import { api } from "@/utils/api";
import DataCategory from "./dataCategori";
import { Metadata } from "next";
import AddCategory from "./addCategory";
import RefreshRouter from "@/app/components/atoms/reFetching";
import { cookies } from "next/headers";

const fetchCategories = async () => {
    const accessToken = cookies().get("accessToken")?.value;
    const categori = await api.get('/categories-close', { headers: { Authorization: `Bearer ${accessToken}` } });
    return categori.data.data;
}

export const metadata: Metadata = {
    title: "Data Categories"
}

export default async function categoriesPage() {
    const categori = await fetchCategories();
    return (
        <>
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <h5 className="card-title mb-3">Data Categories</h5>
                <div className="flex justify-end mb-3">
                    <div className="flex gap-3">
                        <AddCategory />
                        <RefreshRouter />
                    </div>
                </div>
                <DataCategory data={categori} />
            </div>
        </>
    );
}