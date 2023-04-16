import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  title: string;
  href: string;
}

const LinkItem = ({ title = "Home", href = "/" }: Props) => {
  const router = useRouter();
  const isSelected = router.pathname.includes(href);
  return (
    <Link
      href={href}
      className={`${
        isSelected ? "text-white" : "text-secondary"
      } text-sm text-secondary hover:text-white transition duration-200 ease-linear focus:text-white`}
    >
      {title}
    </Link>
  );
};

export default LinkItem;
