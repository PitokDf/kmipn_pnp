'use client'

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import TimelineItem from './TimelineItem';

const timelineData = [
  {
    year: '15 Maret - 10 Mei 2025',
    title: 'Pendaftaran',
    description: 'Proses pendaftaran untuk peserta kompetisi dimulai pada tanggal 15 Maret 2025 hingga 10 Mei 2025. Pada tahap ini, peserta diharuskan mengisi formulir pendaftaran dan mengunggah proposal yang berisi detail ide atau proyek mereka yang akan diikutsertakan dalam kompetisi.',
    icon: '📝',
  },
  {
    year: '22 Mei 2025',
    title: 'Babak penyisihan',
    description: 'Babak penyisihan untuk kategori pengembangan aplikasi permainan akan dilaksanakan pada tanggal 22 Mei 2025. Pada tahap ini, peserta akan diuji mengenai kemampuan mereka dalam merancang, mengembangkan, dan mempresentasikan aplikasi permainan dengan tema yang telah ditentukan sebelumnya.',
    icon: '🎮',
  },
  {
    year: '23 Mei 2025',
    title: 'Penyisihan',
    description: 'Babak penyisihan untuk kategori keamanan siber akan diselenggarakan pada tanggal 23 Mei 2025. Para peserta akan diberikan serangkaian tantangan terkait keamanan sistem, seperti analisis kerentanan dan simulasi serangan, untuk menguji kemampuan mereka dalam menjaga keamanan teknologi informasi.',
    icon: '🛡️',
  },
  {
    year: '9 Juni 2025',
    title: 'Babak penyisihan kedua',
    description: 'Tahap kedua dari babak penyisihan akan berlangsung pada tanggal 9 Juni 2025. Pada tahap ini, peserta yang telah lolos seleksi sebelumnya akan kembali bersaing untuk menunjukkan peningkatan dari hasil pengembangan aplikasi permainan yang telah mereka buat, dengan kriteria penilaian yang lebih ketat.',
    icon: '⚙️',
  },
  {
    year: '30 Juni 2025',
    title: 'Pengumuman',
    description: 'Pengumuman finalis kompetisi akan dilakukan pada tanggal 30 Juni 2025. Peserta yang berhasil lolos ke tahap final akan diinformasikan melalui situs resmi kompetisi dan juga melalui email yang terdaftar pada saat pendaftaran.',
    icon: '📢',
  },
  {
    year: '31 Juli - 3 Agustus 2025',
    title: 'Final',
    description: 'Babak final akan dilaksanakan dari tanggal 31 Juli hingga 3 Agustus 2025. Pada tahap ini, para finalis akan mempresentasikan hasil akhir dari proyek mereka di hadapan dewan juri. Penilaian akan dilakukan secara menyeluruh berdasarkan kreativitas, inovasi, dan dampak yang dihasilkan dari proyek tersebut.',
    icon: '🏆',
  },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} id="timeline" className="py-24 bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Timeline
          </motion.h2>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-1 bg-blue-500 mx-auto rounded"
          ></motion.div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200">
            <motion.div
              className="absolute top-0 left-0 w-full bg-blue-600"
              style={{
                height: scrollYProgress,
                scaleY: scrollYProgress
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.year}
                data={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
