'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/useActiveSection';

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, label, icon, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const activeSection = useActiveSection();
  
  // Check if this is a section link (starts with #)
  const isSectionLink = href.startsWith('#');
  const sectionId = href.replace('#', '');
  
  // Determine if the link is active based on either pathname or section
  const isActive = isSectionLink 
    ? activeSection === sectionId
    : pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 ease-in-out",
        "hover:bg-gray-100 hover:text-gray-900",
        isActive ? "text-gray-900 bg-gray-100" : "text-gray-600"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default NavLink;