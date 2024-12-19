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
        <section ref={containerRef} id="sambutan" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-wide"
                    >
                        Sambutan
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-1 bg-blue-500 mx-auto rounded"
                    ></motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white shadow-md p-8 rounded-lg border-t-4 border-blue-500 mb-12"
                >
                    <p className="text-center text-lg md:text-xl text-gray-700 leading-relaxed">
                        Selamat datang di <strong>Kompetisi Mahasiswa Bidang Informatika Politeknik Nasional (KMIPN) 2025</strong>. Pagelaran ketujuh ini, Politeknik Negeri Padang (PNP) menjadi tuan rumah dan akan membawa semangat baru untuk membawakan pengalaman berkompetisi yang lebih seru. Menuju Indonesia Emas 2045, pendidikan tinggi vokasi menjadi wadah bagi para mahasiswa untuk mengembangkan inovasi di seluruh bidang ilmu pengetahuan.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Tentu saja perguruan tinggi tidak dapat berdiri sendiri dalam mengembangkan inovasi. Perlu adanya kolaborasi dengan industri untuk berkembang bersama-sama. Dengan mengusung tema:
                        </p>
                    </div>

                    <motion.strong
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center flex justify-center text-xl md:text-2xl font-semibold text-blue-700 bg-blue-100 p-4 rounded-lg shadow"
                    >
                        "Vokasi Mewujudkan Kampus Prestasi Menuju Inovasi Informatika"
                    </motion.strong>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 flex justify-center"
                >
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition">
                        Pelajari Lebih Lanjut
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default SambutanSection;
