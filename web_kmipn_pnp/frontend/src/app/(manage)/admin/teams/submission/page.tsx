import { Metadata } from "next";
import DataSubmissions from "./DataSubmission";

export const metadata: Metadata = {
    title: 'Submission Team',
};


export default function SubmisisonPage() {
    return (
        <>
            <h1 className="text-3xl mb-6 font-bold">Submission Team</h1>
            <div className="card border border-gray-500">
                <div className="card-body">
                    <h1 className="text-xl font-semibold mb-3">Manage Submission</h1>
                    <div className="flex justify-end mb-3">
                        {/* <AddUser /> */}
                    </div>
                    <DataSubmissions />
                </div>
            </div>
        </>
    );
}