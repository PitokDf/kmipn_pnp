'use client'

import { motion } from 'framer-motion';

interface TimelineItemProps {
  data: {
    year: string;
    title: string;
    description: string;
    icon: string | React.ReactNode;
  };
  index: number;
}

const TimelineItem = ({ data, index }: TimelineItemProps) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-16">
      {/* Vertical Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500 md:block hidden"></div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="flex flex-col md:flex-row items-center relative"
      >
        {/* Mobile Layout */}
        <div className="block md:hidden w-full text-center">
          {/* Icon on Top for Mobile */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl shadow-lg mx-auto mb-4"
          >
            {data.icon}
          </motion.div>
          {/* Description */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
              {data.year}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h3>
            <p className="text-gray-600">{data.description}</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full">
          {/* Left Content */}
          <div
            className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:text-right order-1' : 'order-1 md:order-1'
              } text-center md:text-left px-4 md:px-0`}
          >
            {!isEven && (
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                  {data.year}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h3>
                <p className="text-gray-600">{data.description}</p>
              </div>
            )}
          </div>

          {/* Center Icon */}
          <div className="mx-auto md:mx-0 order-2 my-4 md:my-0">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
              className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-transform"
            >
              {data.icon}
            </motion.div>
          </div>

          {/* Right Content */}
          <div
            className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'order-3' : 'order-1 md:order-3'
              } text-center md:text-left px-4 md:px-0`}
          >
            {isEven && (
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                  {data.year}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h3>
                <p className="text-gray-600">{data.description}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
