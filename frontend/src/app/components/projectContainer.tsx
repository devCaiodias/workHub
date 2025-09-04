'use client'
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import CreateProject from "./createProject";
import { Button } from "./ui/button";

interface Project {
  id: number
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

  async function handleDeleteProject(projectId: number) {
    const token = getCookie('access_token');
    if (!token) {
      console.error("Token de autenticação não encontrado.");
      return;
    }
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    try {
      await axios.delete(`http://localhost:8080/project/delete/${projectId}`, { headers })
      console.log(`Task deletada com successo!!`)
      fetchProject()
    } catch (error) {
      console.log(error)
    }
  }

  const handleProjectClick = (projectId: number) => {
    router.push(`/Tasks/${projectId}`)
  }

  return (
    <div className="flex justify-center">
      <section className="grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4  gap-5">
        {project.map((projects) => (
          <div key={projects.id} className="bg-[#F0F0F0] cursor-pointer hover:bg-gray-300" onClick={() => handleProjectClick(projects.id)}>
            <Image src={`${projects.imgUrl}`} alt="One Project" width={375} height={238} className="object-cover w-[375px] h-[238px]" />

            <div className="flex items-center justify-between">
              <p className="p-2 font-title">{projects.name}</p>
              <Button className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-black" variant="ghost" onClick={(e) => {
          e.stopPropagation()
          handleDeleteProject(projects.id);
        }}>Delete</Button>

            </div>
          </div>

        ))}

        <CreateProject />
      </section>
    </div>
  )
}
