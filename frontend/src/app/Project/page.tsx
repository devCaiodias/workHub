'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getCookie, deleteCookie } from "cookies-next"
import Image from "next/image"
import projectImg from "../../../public/project.jpg"
import { Separator } from "@/components/ui/separator"
import ProjectContainer from "../components/projectContainer"

interface Project {
  id: string
  name: string
  description: string
  imgUrl: string
}

export default function Project() {
  const [project, setProject] = useState<Project[]>([])
  const router = useRouter()

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
      await axios.get('http://localhost:8080/auth/validate', { headers, withCredentials: true })
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

  async function logout() {
    try {

      const token = getCookie('token');
      if (token) {
        const headers = { 'Authorization': `Bearer ${token}` };
        await axios.post('http://localhost:8080/auth/logout', {}, { headers });
      }
      deleteCookie('access_token')
      router.push('/Singin');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="h-[153px] bg-gray-200 flex items-start justify-items-start">
      </section>
      <Image src={projectImg} alt="project" className="object-cover mt-[-70px] ml-40 w-[226px] h-[226px]" />
      <div className="flex justify-center flex-col px-5 py-11">
        <h1 className="text-6xl ml-12">PROJECT</h1>
        <Separator className="bg-black mb-10" />
        <ProjectContainer />
      </div>
    </>
  )
}
