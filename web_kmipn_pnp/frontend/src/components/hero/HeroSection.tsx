import CountdownTimer from './CountdownTimer';
import WaveBackground from './WaveBackground';

const HeroSection = () => {
    return (
        <section id='home' className="relative min-h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
            <WaveBackground />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        <span className="block">Welcome to <span className="text-yellow-300">KMIPN VII</span></span>
                    </h1>

                    <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Kompetisi Mahasiswa Informatika Politeknik
                        Nasional (KMIPN) merupakan ajang
                        bergengsi untuk Politeknik se-Indonesia
                        di bidang Informatika.
                    </p>

                    <div className="flex justify-center mb-12">
                        <CountdownTimer />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/auth/register"
                            className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 
                            transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400">
                            Daftar Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
