import { Metadata } from "next";
import DataProsals from "./DataPropsal";

export const metadata: Metadata = {
    title: 'Proposal Team',
};


export default function ProposalPage() {
    return (
        <>
            <h1 className="text-3xl mb-6 font-bold">Proposal Team</h1>
            <div className="card border border-gray-500">
                <div className="card-body">
                    <h1 className="text-xl font-semibold mb-3">Manage Propsals</h1>
                    <div className="flex justify-end mb-3">
                        {/* <AddUser /> */}
                    </div>
                    <DataProsals />
                </div>
            </div>
        </>
    );
}