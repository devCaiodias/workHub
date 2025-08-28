import Image from "next/image";
import defaultImg from "../../../public/T.jpg"

export default function ProjectContainer() {
  return (
    <div className="flex justify-center">
    <section className="grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4  gap-5">
      <div className="flex flex-col bg-[#F0F0F0] w-[375px] ">
        <Image src={defaultImg} alt="One Project" className="object-cover w-[375px] h-[238px]" />

          <p className="p-2 font-title">TypeScript</p>

      </div>
      <div className="flex flex-col bg-[#F0F0F0] ">
        <Image src={defaultImg} alt="One Project" className="object-cover w-[375px] h-[238px]" />

          <p className="p-2 font-title">TypeScript</p>

      </div>
      <div className="flex flex-col bg-[#F0F0F0]  ">
        <Image src={defaultImg} alt="One Project" className="object-cover w-[375px] h-[238px]" />

          <p className="p-2 font-title">TypeScript</p>

      </div>
      <div className="flex flex-col bg-[#F0F0F0]  ">
        <Image src={defaultImg} alt="One Project" className="object-cover w-[375px] h-[238px]" />

          <p className="p-2 font-title">TypeScript</p>

      </div>

      <div className="bg-[#F0F0F0] h-[58px] flex items-center justify-start pl-4 "> + New Project</div>
    </section>
    </div>
  )
}
