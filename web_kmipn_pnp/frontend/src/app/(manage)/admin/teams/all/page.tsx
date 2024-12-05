import { Metadata } from "next";
import DataTeams from "./DataTeams";

export const metadata: Metadata = {
    title: 'Data Team',
};


export default function UserPage() {
    return (
        <>
            <h1 className="text-3xl mb-6 font-bold">All Team Page</h1>
            <div className="card border border-gray-500">
                <div className="card-body">
                    <h1 className="text-xl font-semibold mb-3">Manage Teams</h1>
                    <div className="flex justify-end mb-3">
                        {/* <AddUser /> */}
                    </div>
                    <DataTeams />
                </div>
            </div>
        </>
    );
}