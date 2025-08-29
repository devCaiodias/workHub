'use client'
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import CreateProject from "./createProject";

interface Project {
  id: string
  name: string
  description: string
  imgUrl: string
}

export default function ProjectContainer() {
  const router = useRouter()
  const [project, setProject] = useState<Project[]>([])

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
      const resp = await axios.get('http://localhost:8080/project/all', { headers })
      setProject(resp.data)

    } catch (error) {
      console.log(error)
      router.push('/Singin')
    }
  }
  useEffect(() => {
    fetchProject()
  }, [])

  return (
    <div className="flex justify-center">
      <section className="grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4  gap-5">
        {project.map((projects) => (
          <div key={projects.id} className="bg-[#F0F0F0] cursor-pointer hover:bg-gray-300">
            <Image src={`${projects.imgUrl}`} alt="One Project" width={375} height={238} className="object-cover w-[375px] h-[238px]" />

            <p className="p-2 font-title">{projects.name}</p>
          </div>
        ))}

        <CreateProject />
      </section>
    </div>
  )
}
