import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  title: string;
  href: string;
  onClick?: () => void;
}

const LinkItem = ({ title = "Home", href = "/", onClick }: Props) => {
  const router = useRouter();
  const isSelected =
    href !== "/"
      ? router.pathname.includes(href)
      : router.pathname === href
      ? true
      : false;
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`${
        isSelected ? "text-primary" : "text-white "
      } text-xl font-medium lg:text-sm hover:text-primary transition duration-200 ease-linear focus:text-primary`}
    >
      {title}
    </Link>
  );
};

export default LinkItem;
