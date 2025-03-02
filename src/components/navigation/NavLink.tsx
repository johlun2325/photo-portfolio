import Link from 'next/link';
import { NavItem } from '@/types';

type NavLinkProps = NavItem & {

    className?: string;
};

export const NavLink = ({ path, label, className = '' }: NavLinkProps) => (
  <li>
    <Link 
      href={path} 
      className={`text-gray-700 hover:text-gray-900 hover:underline font-bold ${className}`}
    >
      {label}
    </Link>
  </li>
);
