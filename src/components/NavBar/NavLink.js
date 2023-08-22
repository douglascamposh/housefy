import Link from "next/link";

const NavItem = ({ href, children, onClick }) => (
  <li
    onClick={onClick}
    className="mr-4 lg:mr-8 hover:text-primary text-sm cursor-pointer"
  >
    <Link href={href}>{children}</Link>
  </li>
);

export default NavItem;
