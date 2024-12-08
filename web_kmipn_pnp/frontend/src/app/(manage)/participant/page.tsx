import { Metadata } from "next";
import InformasiTeam from "./InformasiTeam";

export const metadata: Metadata = {
    title: 'Dashboard Peserta',
};

export default function ParticipantDashboard() {

    return (
        <div>
            <h1 className="text-4xl mb-6 font-bold">Wellcome!</h1>
            <div className="grid grid-cols-1 gap-6">
                <InformasiTeam />
            </div>
        </div>
    );
}