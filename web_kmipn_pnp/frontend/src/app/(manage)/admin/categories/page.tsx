import { Metadata } from "next";
import DataCategories from "./DataCategories";
import AddCategory from "./AddCategory";

export const metadata: Metadata = {
    title: 'Kelola Kategori',
};

export default function CategoriesPage() {
    return (
        <>
            <h1 className="text-4xl mb-6 font-bold">Categories</h1>
            <div className="card border border-gray-500">
                <div className="card-body">
                    <h1 className="text-2xl font-semibold mb-3">Manage Category</h1>
                    <div className="flex justify-end mb-3">
                        <AddCategory />
                    </div>
                    <DataCategories />
                </div>
            </div>
        </>
    );
}