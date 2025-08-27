'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getCookie, deleteCookie } from "cookies-next"

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
    <div>
      Project page

      <button type="button" onClick={logout} className="cursor-pointer">Logout</button>
    </div>
  )
}
