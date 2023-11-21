const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full bg-gray-100 h-14">
      <div className="max-w-[92rem] w-full px-4 mx-auto flex items-center h-full">
        <p className="opacity-80">© QTrip {year}</p>
      </div>
    </div>
  );
};

export default Footer;
