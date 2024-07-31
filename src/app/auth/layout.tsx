import Sky from "@/components/assets/images/background/sky-1.gif";
import NextImage from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center md:h-screen h-screen bg-[#5FC7FF]">
      <div>
        <NextImage
          src={Sky}
          alt="sky"
          fill={true}
          style={{ opacity: 0.3, pointerEvents: "none", userSelect: "none" }}
        />
      </div>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              <Logo />
            </div>
          </div> */}
        {children}
      </div>
    </main>
  );
}
