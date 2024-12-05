import { Metadata } from "next";
import DataTeam from "./DataTeam";

export const metadata: Metadata = {
    title: 'Data Tim',
};
export default function DashboardTeam() {
    return (
        <>
            <h1 className="text-4xl mb-6 font-bold">Dashboard Tim!</h1>
            <div className="card border-l-4 border-indigo-600">
                <div className="card-body">
                    <DataTeam />
                </div>
            </div>
        </>
    )
};