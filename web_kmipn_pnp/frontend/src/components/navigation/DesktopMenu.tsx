import NavLink from './NavLink';
import { MenuItem } from './types';

interface DesktopMenuProps {
  menuItems: MenuItem[];
}

const DesktopMenu = ({ menuItems }: DesktopMenuProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {menuItems.map((item) => (
        <NavLink key={item.href} {...item} />
      ))}
    </div>
  );
};

export default DesktopMenu;