'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import axios from "axios"
import { Button } from "./ui/button"

interface Task {
  id: number
  title: string
  description: string
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA'
  dataVencimento: Date | null
}

interface TaskContainerProps {
  projectId: string;
}

export default function TaskContainer({ projectId }: TaskContainerProps) {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchTasks()
    }
  }, [projectId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>A carregar tarefas...</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
    <div className="grid lg:grid-cols-3 gap-10">
      {/* Pendentes */}
      <div className="bg-[#EEEEEE] opacity-[40%] p-4 rounded-lg shadow-md w-[375px]">
        <h2 className="text-xl font-semibold mb-4 pb-2">PENDENTE</h2>
        {tasks.filter(t => t.status === 'PENDENTE').length > 0 ? (
          tasks.filter(t => t.status === 'PENDENTE').map(task => (
            <div key={task.id} className="bg-white p-3 rounded-md shadow-sm mb-2">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-3">Nenhuma tarefa pendente.</p>
        )}
        <Button className="bg-[#F0F0F0] w-[300px] h-[58px] pl-4 cursor-pointer justify-start hover:bg-gray-300 rounded-4xl" variant="outline">+ New Project</Button>
      </div>

      {/* Em Andamento */}
      <div className="bg-[#EEEEEE] opacity-[40%] p-4 rounded-lg shadow-md w-[375px]">
        <h2 className="text-xl font-semibold mb-4 pb-2">IN PROGRESS</h2>
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
      <div className="bg-[#EEEEEE] opacity-[40%] p-4 rounded-lg shadow-md w-[375px]">
        <h2 className="text-xl font-semibold mb-4 pb-2">CONPLETED</h2>
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
