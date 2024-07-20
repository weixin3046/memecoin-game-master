// import { GlobeAltIcon } from '@heroicons/react/24/outline';
import NextImage from "next/image";
export default function Logo() {
  return (
    <div
      className={` flex flex-row gap-3 items-center leading-none text-white`}
    >
      {/* <NextImage
        src={"/bnb.svg"}
        alt="logo"
        className="h-12 w-12 rotate-[15deg]"
      /> */}
      <NextImage
        src={"/logo.png"}
        alt="BNB"
        className="h-12 w-12"
        width={100}
        height={100}
      />
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
