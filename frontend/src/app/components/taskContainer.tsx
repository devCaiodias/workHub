"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import TaskManagement from "./taskManagement";

interface Project {
  id: number
  name: string
  description: string
  imgUrl: string
}

export default function TaskContainer({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  const fetchProject = async () => {
    try {
      const token = getCookie('access_token')
      if (!token) {
        router.push('/Singin')
        return
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      }
      const resp = await axios.get(`http://localhost:8080/project/${Number(projectId)}`, { headers })
      setProject(resp.data)

    } catch (error) {
      console.log(error)
      router.push('/Singin')
    }
  }

  useEffect(() => {
    fetchProject()
  }, [projectId])

  return (
    <div>
      <section className="h-[153px] bg-gray-200 flex items-start justify-end">
      </section>
      {/* O bloco do projeto foi corrigido. */}
      {project && (
        <>
          <Image
            src={project.imgUrl}
            alt="project"
            width={226}
            height={226}
            className="object-cover mt-[-70px] ml-40 w-[226px] h-[226px]"
          />
          <div className="flex justify-center flex-col px-32 py-11">
            <h1 className="text-6xl ml-12 text-center sm:text-left">{project.name}</h1>
            <Separator className="bg-black mb-10" />
          </div>
          <TaskManagement projectId={projectId} />
        </>
      )}
    </div>
  );
}
