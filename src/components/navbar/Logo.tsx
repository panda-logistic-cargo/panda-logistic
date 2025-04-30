
interface LogoProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

export const Logo = ({ isScrolled, isHomePage }: LogoProps) => {
  return (
    <a href="/" className="flex items-center">
      <span className="text-2xl font-bold text-cargo-red">
        PANDA <span className={isScrolled ? "text-cargo-black" : isHomePage ? "text-white" : "text-cargo-gray-800"}>LOGISTIC</span>
      </span>
    </a>
  );
};
