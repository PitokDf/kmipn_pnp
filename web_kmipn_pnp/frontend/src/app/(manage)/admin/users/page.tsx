import { Metadata } from "next";
import DataUsers from "./DataUsers";
import AddUser from "./AddUser";

export const metadata: Metadata = {
    title: 'Data User',
};


export default function UserPage() {
    return (
        <>
            <h1 className="text-3xl mb-6 font-bold">Users Page</h1>
            <div className="card border border-gray-500">
                <div className="card-body">
                    <h1 className="text-xl font-semibold mb-3">Manage Users</h1>
                    <div className="flex justify-end mb-3">
                        <AddUser />
                    </div>
                    <DataUsers />
                </div>
            </div>
        </>
    );
}