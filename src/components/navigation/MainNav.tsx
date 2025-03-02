import { NavLink } from './NavLink';
import { navigationItems } from './NavItems';

type MainNavProps = {
  className?: string;
};

export const MainNav = ({ className = '' }: MainNavProps) => {
  return (
    <nav aria-label="Huvudnavigation" className={className}>
      <ul className="flex space-x-6">
        {navigationItems.map((item) => (
          <NavLink key={item.path} {...item} />
        ))}
      </ul>
    </nav>
  );
};
