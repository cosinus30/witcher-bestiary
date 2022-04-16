interface NavbarItemProps {
  label: string;
  link: string;
  logo?: React.ReactNode;
}

const NavbarItem = ({ label, link, logo }: NavbarItemProps) => {
  return (
    <a className="flex items-center text-white" target="_blank" href={link} rel="noreferrer">
      {logo}
      <span className="hidden sm:block">{label}</span>
    </a>
  );
};

export default NavbarItem;
