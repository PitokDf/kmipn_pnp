'use client'

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { borderColor } from "@/lib/others_required";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
    const { data: dashboardData, error } = useSWR("/api/v1/admin/dashboard", fetcher);
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    if (error) {
        console.log("Error fetching data");
        return <p className="text-red-500 dark:text-red-300">Failed to load dashboard data</p>;
    }

    const categoryInfo = dashboardData?.category || [];
    const recentTeams = dashboardData?.recentTeams || [];
    useEffect(() => {
        setModalOpen(dashboardData?.proposalsPending > 0)
    }, [dashboardData])
    const handleModal = () => setModalOpen(!modalOpen);
    return (
        <div className="p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Dashboard</h1>
            {modalOpen && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Notification</h2>
                            <button
                                onClick={handleModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="">
                                {dashboardData?.proposalsPending > 0 && <h3 className="text-lg font-semibold text-gray-700">Terdapat {dashboardData?.proposalsPending} proposal yang menunggu di tindak lanjuti. <Link href={"/admin/teams/proposal?query=pending"}
                                    className="link-primary link-underline"
                                >
                                    Take Action
                                </Link></h3>}

                                {dashboardData?.totalTeamPending > 0 && <h3 className="text-lg font-semibold text-gray-700">Terdapat {dashboardData?.totalTeamPending} team yang menunggu di tindak lanjuti. <Link href={"/admin/teams/all?query=false"}
                                    className="link-primary link-underline"
                                >
                                    Take Action
                                </Link></h3>}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
                , document.body)}
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {[
                    {
                        title: "Total Tim Terdaftar",
                        value: dashboardData?.totalTeam || 0,
                        color: "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100",
                    },
                    {
                        title: "Proposal Pending",
                        value: dashboardData?.proposalsPending || 0,
                        color: "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100",
                    },
                    {
                        title: "Proposal Diverifikasi",
                        value: dashboardData?.proposalsVerified || 0,
                        color: "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100",
                    },
                ].map((stat, index) => (
                    <div
                        key={index}
                        className={`rounded-lg shadow-lg dark:shadow-none p-6 flex flex-col items-center ${stat.color} hover:shadow-xl transition-shadow`}
                    >
                        <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Banyak Tim per Kategori</h3>
                    <div className="h-64">
                        <Bar
                            data={{
                                labels: categoryInfo.labels || [],
                                datasets: [
                                    {
                                        data: categoryInfo.data || [],
                                        label: "Jumlah Tim",
                                        backgroundColor: borderColor,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "#333333",
                                            font: {
                                                family: "'Poppins', sans-serif"
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Progress Section */}
                <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Progress Proposal</h3>
                    <div className="space-y-4">
                        {[{
                            label: "Pending",
                            value: dashboardData?.proposalsPending || 0,
                            total: dashboardData?.totalProposal || 1,
                            color: "bg-yellow-500",
                        }, {
                            label: "Diverifikasi",
                            value: dashboardData?.proposalsVerified || 0,
                            total: dashboardData?.totalProposal || 1,
                            color: "bg-green-500",
                        },
                        {
                            label: "Ditolak",
                            value: dashboardData?.proposalsRejected || 0,
                            total: dashboardData?.totalProposal || 1,
                            color: "bg-red-500",
                        }
                        ].map((progress, idx) => (
                            <div key={idx}>
                                <p className="text-sm font-medium mb-1">{progress.label}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-2.5 rounded-full ${progress.color}`}
                                        style={{
                                            width: `${Math.min((progress.value / progress.total) * 100, 100)}%`,
                                            maxWidth: "100%",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Teams Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Tim Perlu verifikasi</h3>
                <table className="w-full text-left text-gray-700 dark:text-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Nama Tim</th>
                            <th className="py-2 px-4">Institusi</th>
                            <th className="py-2 px-4">Tanggal Terdaftar</th>
                            <th className="py-2 px-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTeams.map((team: any, index: number) => (
                            <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-2 px-4">{team.name}</td>
                                <td className="py-2 px-4">{team.institution}</td>
                                <td className="py-2 px-4">{new Date(team.createdAt).toLocaleDateString('id-ID', { year: "numeric", month: "long", day: "numeric" })}</td>
                                <td className="py-2 px-4">
                                    <Link href={`/admin/teams/all?query=${team.name}`} className="link-primary">Lihat</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
