import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const font = localFont({
  src: [
    {
      path: "../../fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
  ],
});

function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        width={40}
        height={40}
        alt="Jotion"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        width={40}
        height={40}
        alt="Jotion"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
}

export default Logo;
