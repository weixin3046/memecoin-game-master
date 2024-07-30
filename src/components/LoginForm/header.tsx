import { Poppins } from "next/font/google";

interface HeaderProps {
  label?: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={`text-3xl font-semibold`}>MEMELAND GAME</h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export default Header;
