export const metadata = {
    title: 'KMIPN VII',
};

import { KategoriSection, LokasiKami } from "@/components/categori/CategoriSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import SambutanSection from "@/components/sambutan/SambutanSection";
import TimelineSection from "@/components/timeline/TimelineSection";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <SambutanSection />
            <TimelineSection />
            <KategoriSection />
            <LokasiKami />
            <Footer />
        </>
    );
}