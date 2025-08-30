'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import axios from "axios"

interface Task {
  id: number
  title: string
  description: string
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA'
  dataVencimento: Date | null
}

interface Project {
  id: number
  name: string
  description: string
  imgUrl: string
}

export default function Page({ params }: { params: { projectId: string } }) {
  const router = useRouter()
  const { projectId } = params
  const [tasks, setTasks] = useState<Task[]>([])
  const [project, setProject] = useState<Project | null>()

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

  const fetchTasks = async () => {
    try {
      const token = getCookie('access_token')
      if (!token) {
        router.push('/Singin')
        return
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      // garante que projectId vai como número
      const response = await axios.get(
        `http://localhost:8080/project/${Number(projectId)}/task`,
        { headers }
      )

      console.log("ProjectId recebido:", projectId)
      console.log("Tasks recebidas:", response.data)

      setTasks(response.data)
    } catch (error) {
      console.error(error)
      router.push('/Singin')
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchTasks()
    }
    fetchProject()
  }, [projectId])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {project ? `Tarefas do Projeto ${project.name}` : "Carregando..."}
      </h1>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Pendentes */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">Pendentes</h2>
          {tasks.filter(t => t.status === 'PENDENTE').length > 0 ? (
            tasks.filter(t => t.status === 'PENDENTE').map(task => (
              <div key={task.id} className="bg-white p-3 rounded-md shadow-sm mb-2">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma tarefa pendente.</p>
          )}
        </div>

        {/* Em Andamento */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">Em Andamento</h2>
          {tasks.filter(t => t.status === 'EM_ANDAMENTO').length > 0 ? (
            tasks.filter(t => t.status === 'EM_ANDAMENTO').map(task => (
              <div key={task.id} className="bg-white p-3 rounded-md shadow-sm mb-2">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma tarefa em andamento.</p>
          )}
        </div>

        {/* Concluídas */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">Concluídas</h2>
          {tasks.filter(t => t.status === 'CONCLUIDA').length > 0 ? (
            tasks.filter(t => t.status === 'CONCLUIDA').map(task => (
              <div key={task.id} className="bg-white p-3 rounded-md shadow-sm mb-2">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma tarefa concluída.</p>
          )}
        </div>
      </div>
    </div>
  )
}
