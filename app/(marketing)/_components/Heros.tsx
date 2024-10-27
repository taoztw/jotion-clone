import Image from "next/image";

function Heros() {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src="/documents.png"
            alt="documents"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/documents-dark.png"
            alt="documents"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
        <div className="hidden relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] md:block">
          <Image
            src="/reading.png"
            alt="documents"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/reading-dark.png"
            alt="documents"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Heros;
