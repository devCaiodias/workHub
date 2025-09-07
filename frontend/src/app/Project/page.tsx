'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { getCookie, deleteCookie } from "cookies-next"
import Image from "next/image"
import projectImg from "../../../public/project.jpg"
import { Separator } from "@/components/ui/separator"
import ProjectContainer from "../components/projectContainer"
import { Button } from "../components/ui/button"

export default function Project() {
  const router = useRouter()


    try {
      const token = getCookie('access_token')
      if (!token) {
        router.push('/Singin')
        return
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      }
      axios.get('https://workhub-ns8j.onrender.com/auth/validate', { headers, withCredentials: true })
    } catch (error) {
      console.log(error)
      router.push('/Singin')
    }


  async function logout() {
    try {

      const token = getCookie('token');
      if (token) {
        const headers = { 'Authorization': `Bearer ${token}` };
        await axios.post('https://workhub-ns8j.onrender.com/auth/logout', {}, { headers });
      }
      deleteCookie('access_token')
      router.push('/Singin');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="h-[153px] bg-gray-200 flex items-start justify-end">
        <Button className="text-right m-6 bg-[#F0F0F0] hover:bg-gray-300 text-black p-6" onClick={logout}>Logout</Button>
      </section>
      <Image src={projectImg} alt="project" className="object-cover mt-[-70px] ml-40 w-[226px] h-[226px]" />
      <div className="flex justify-center flex-col px-32 py-11">
        <h1 className="text-6xl ml-12 text-center sm:text-left">PROJECT</h1>
        <Separator className="bg-black mb-10" />
        <ProjectContainer />
      </div>
    </>
  )
}
