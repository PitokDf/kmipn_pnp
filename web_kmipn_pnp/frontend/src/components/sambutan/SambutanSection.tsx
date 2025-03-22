'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

const SambutanSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} id="sambutan" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Heading Section */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-extrabold text-gray-900 tracking-wide"
                    >
                        Sambutan
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-4"
                    ></motion.div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <img
                            src="/images/developer.webp"
                            alt="Sambutan"
                            className="rounded-lg shadow-lg"
                        />
                        {/* Decorative Element */}
                        <div className="absolute -top-6 -left-6 w-14 h-14 object-fill bg-blue-100 rounded-full shadow-md"></div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-gray-700 leading-relaxed space-y-6"
                    >
                        <p className="text-lg md:text-xl">
                            Selamat datang di <strong>Kompetisi Mahasiswa Bidang Informatika Politeknik Nasional (KMIPN) 2025</strong>. Pagelaran ketujuh ini, Politeknik Negeri Padang (PNP) menjadi tuan rumah dan akan membawa semangat baru untuk membawakan pengalaman berkompetisi yang lebih seru.
                        </p>
                        <p className="text-lg md:text-xl">
                            Menuju Indonesia Emas 2045, pendidikan tinggi vokasi menjadi wadah bagi para mahasiswa untuk mengembangkan inovasi di seluruh bidang ilmu pengetahuan.
                        </p>
                    </motion.div>
                </div>

                {/* Highlight Section */}
                <div className="mt-16 bg-blue-50 p-8 rounded-lg shadow-md">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-lg md:text-xl text-gray-700 leading-relaxed"
                    >
                        <strong>Tema: </strong>
                        <span className="text-blue-600 font-semibold">
                            "Vokasi Mewujudkan Kampus Prestasi Menuju Inovasi Informatika"
                        </span>
                    </motion.p>
                </div>

                {/* Button Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 flex justify-center"
                >
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                        Pelajari Lebih Lanjut
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default SambutanSection;
