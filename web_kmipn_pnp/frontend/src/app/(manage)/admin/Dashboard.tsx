'use client'

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useSWR from "swr";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function DashboardPage() {
    const { data: data, error } = useSWR("/api/v1/admin/dashboard");
    // if (!data) { console.log("sedang ngambil data.."); return; }
    if (!error) { console.log("error"); return; }
    // const categoryInfo = data.category;
    console.log(data);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Total Tim Terdaftar</h3>
                        <p className="text-xl font-bold text-blue-600">120</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Proposal Pending</h3>
                        <p className="text-xl font-bold text-yellow-500">15</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Proposal Diverifikasi</h3>
                        <p className="text-xl font-bold text-green-600">50</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Tim Berdasarkan Status</h3>
                        <p className="text-xl font-bold text-gray-600">Pending: 20 | Verified: 80</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Jumlah Pengguna Berdasarkan Role</h3>
                        <p className="text-xl font-bold text-gray-600">Admin: 5 | Juri: 10 | Participant: 100</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="card">
                    <div className="card-body">
                        <Bar data={{
                            datasets: [
                                {
                                    data: [12, 43, 342],
                                    label: "ss",

                                }
                            ]
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}