const Header = () => {
  return (
    <div className="relative mx-auto max-w-3xl text-center text-transparent bg-clip-text bg-bottom bg-witcher-image">
      <div className="absolute right-36 -bottom-16 w-96 h-96 bg-red-200 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute right-36 bottom-24 w-48 h-48 bg-red-50 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-16 left-36 w-48 h-48 bg-red-50 rounded-full opacity-10 blur-3xl"></div>
      <h1 className="block text-7xl sm:text-8xl ">Know Your</h1>
      <h1 className="block text-8xl sm:text-9xl">Enemy</h1>
    </div>
  );
};

export default Header;
