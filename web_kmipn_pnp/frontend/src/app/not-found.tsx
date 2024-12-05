import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Page Not Found',
};

export default function NotFound() {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex gap-2 items-center">
                <span className="text-6xl font-bold">404</span>
                <div className="border-l-2 border-gray-400 ps-2">
                    <h1 className="text-md font-semibold">Page Not Found!</h1>
                    <span className="text-xs">Entah apa yang membawa kamu kemari.</span>
                </div>
            </div>
        </div>
    )
}