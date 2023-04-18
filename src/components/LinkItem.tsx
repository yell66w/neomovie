import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  title: string;
  href: string;
}

const LinkItem = ({ title = "Home", href = "/" }: Props) => {
  const router = useRouter();
  const isSelected = href !== "/" ? router.pathname.includes(href) : false;
  return (
    <Link
      href={href}
      className={`${
        isSelected ? "text-primary" : "text-white "
      } font-medium text-sm hover:text-primary transition duration-200 ease-linear focus:text-primary`}
    >
      {title}
    </Link>
  );
};

export default LinkItem;
