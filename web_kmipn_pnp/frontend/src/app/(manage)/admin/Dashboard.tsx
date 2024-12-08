'use client'

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { borderColor } from "@/lib/others_required";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function DashboardPage() {
    const { data: data, error } = useSWR("/api/v1/admin/dashboard", fetcher);
    if (error) { console.log("error"); return; }
    const categoryInfo = data?.category || [];
    console.log(data);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 gap-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Total Tim Terdaftar</h3>
                        <p className="text-xl font-bold text-blue-600">{data?.totalTeam}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Proposal Pending</h3>
                        <p className="text-xl font-bold text-yellow-500">{data?.proposalsPending}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-gray-700">Proposal Diverifikasi</h3>
                        <p className="text-xl font-bold text-green-600">{data?.proposalsVerified}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-[3fr_1fr]">
                <div className="card">
                    <div className="card-body h-[500px] w-full">
                        <Bar data={{
                            labels: categoryInfo.labels,
                            datasets: [{
                                data: categoryInfo.data,
                                label: "Banyak Tim per Kategori",
                                backgroundColor: borderColor,
                            }]
                        }}
                            options={{ responsive: true, maintainAspectRatio: false }}
                            height={500} />
                    </div>
                </div>
            </div>
        </>
    )
}