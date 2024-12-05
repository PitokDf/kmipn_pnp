import { Metadata } from "next";
import DashboardPage from "./Dashboard";

export const metadata: Metadata = {
    title: 'Dashboard Admin',
};

export default function AdminPage() {
    return (
        <div>
            <DashboardPage />
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Distribusi Kategori Lomba</h3>
                        <canvas id="pieChart"></canvas>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700">Jumlah Tim Berdasarkan Status</h3>
                    <canvas id="barChart"></canvas>
                </div>
            </div> */}
        </div>
    );
}