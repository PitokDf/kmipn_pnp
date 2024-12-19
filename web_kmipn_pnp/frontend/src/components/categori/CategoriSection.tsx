'use client';

import { motion } from 'framer-motion';

const categories = [
    "Internet Of Things",
    "Perencanaan Bisnis Bidang TIK",
    "Hackathon",
    "Animasi",
    "Pengembangan Aplikasi Bidang Permainan",
    "E-Government",
    "Keamanan Siber",
    "Cipta Inovasi di Bidang TIK"
];

const KategoriSection = () => {
    return (
        <section id="kategori" className="py-24 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Kategori Lomba
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-1 bg-blue-500 mx-auto rounded"
                    ></motion.div>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                        Berbagai kategori lomba yang dapat kamu ikuti pada KMIPN 2025. Pilih bidang yang sesuai dengan minat dan keahlianmu!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-bold text-blue-600 mb-2 text-center">{category}</h3>
                            <p className="text-gray-600 text-center">
                                Jelajahi potensi dan tantangan di bidang {category}. Ikuti sekarang dan jadilah juara!
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LokasiKami = () => {
    return (
        <section id="lokasi" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Lokasi Kami
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-1 bg-blue-500 mx-auto rounded"
                    ></motion.div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 h-96 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19385.530568904283!2d100.4508963!3d-0.9188021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7be9e52a171%3A0x609ef1cc57a38e32!2sPoliteknik%20Negeri%20Padang!5e1!3m2!1sid!2sid!4v1734576212506!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Politeknik Negeri Padang
                        </h3>
                        <p className="text-lg text-gray-600">
                            Limau Manis, Pauh, Kota Padang, Sumatera Barat 25175
                            <br />
                            Indonesia, Padang
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { KategoriSection, LokasiKami };