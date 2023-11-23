import 'tailwindcss/tailwind.css';


interface MenuItemProps {
    href: string;
    children: React.ReactNode;
  }
  
  const MenuItem: React.FC<MenuItemProps> = ({ href, children }) => {
    return (
      <a href={href} className="py-4 px-2  hover:text-blue-principal border-b-2 border-transparent hover:border-blue-principal transition duration-300">
        {children}
      </a>
    );
  };
  
  export default MenuItem;