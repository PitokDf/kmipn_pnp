export const metadata = {
    title: 'Homepage KMIPN VII',
};

import { KategoriSection, LokasiKami } from "@/components/categori/CategoriSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import SambutanSection from "@/components/sambutan/SambutanSection";
import TimelineSection from "@/components/timeline/TimelineSection";

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <SambutanSection />
            <TimelineSection />
            <KategoriSection />
            <LokasiKami />
            <Footer />
        </div>
    );
}