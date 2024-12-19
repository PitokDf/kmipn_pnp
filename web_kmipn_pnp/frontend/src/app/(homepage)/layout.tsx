import "../../styles/homepage.css"

import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <main className="pt-16">
                {children}
            </main>
            <BackToTop />
        </div>
    );
}