const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <p className="font-medium">Help and Support</p>
            <p>Phone: 9789987781</p>
            <p>Email: customer@gmail.com</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-400">
            <p>copyright@codetogether</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;