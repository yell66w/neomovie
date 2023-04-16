const Footer = () => {
  return (
    <footer className="mt-20 text-center py-6 text-xs font-light text-secondary bg-neutral">
      Developed by{" "}
      <strong className="text-white">Ryan Benedict Tillaman </strong>
      <a
        href="https://developers.themoviedb.org/"
        target="_blank"
        className="text-primary"
      >
        &copy; The Movie Database API
      </a>
    </footer>
  );
};

export default Footer;
