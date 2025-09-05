
import SinginForm from "@/app/components/in-form";
import Image from "next/image";

export default function Singin() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 flex-col items-center justify-center gap-14">
          <a href="#" className="flex items-center gap-2 font-medium text-4xl">

            <div className="bg-white flex size-20 items-center justify-center rounded-md">
              <Image src="/logo.png" alt="logo" width={500} height={500} />
            </div>
            Work Hub

          </a>
          <div className="w-full max-w-xs">
            <SinginForm />
          </div>
        </div>
      </div>
      <div className="bg-[#F7CE4D] lg:flex items-center justify-center relative hidden h-8/12">
        <Image
          src="/gestao.png"
          alt="Image"
          width={400}
          height={400}
          unoptimized
          className="absolute object-cover w-200 top-36 dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
