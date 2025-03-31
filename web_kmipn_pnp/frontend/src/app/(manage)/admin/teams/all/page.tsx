import { Metadata } from "next";
import DataTeams from "./DataTeams";
import DownloadAttendace from "./DownloadAttendace";

export const metadata: Metadata = {
    title: 'Data Team',
};


export default function UserPage() {
    return (
        <>
            <h1 className="text-3xl mb-6 font-bold">All Team Page</h1>
            <div className="card border border-gray-500">
                <div className="card-body max-w-xl lg:max-w-full">
                    <h1 className="text-xl font-semibold mb-3">Manage Teams</h1>
                    <div className="flex justify-end mb-3">
                        <DownloadAttendace />
                    </div>
                    <DataTeams />
                </div>
            </div>
        </>
    );
}