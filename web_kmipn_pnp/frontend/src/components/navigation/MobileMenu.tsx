'use client';

import { AnimatePresence, motion } from 'framer-motion';
import NavLink from './NavLink';
import { MenuItem } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  onItemClick: () => void;
}

const MobileMenu = ({ isOpen, menuItems, onItemClick }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-red shadow-lg">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                onClick={onItemClick}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;