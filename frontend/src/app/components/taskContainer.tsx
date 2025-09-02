'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import axios from "axios"
import { Button } from "./ui/button"
import { DndContext, useSensors, useSensor, PointerSensor, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Task {
  id: number
  title: string
  description: string
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA'
  dataVencimento: string
}

interface TaskContainerProps {
  projectId: string;
}

// Sub-componente para o cartão da tarefa
const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: `task-${task.id}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab"
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#D9D9D9] p-3 rounded-md shadow-sm mb-2 opacity-70"
    >
      <p className="font-medium">{task.title.toLocaleUpperCase()}</p>
      <p className="text-sm text-gray-500 text-right mt-6">{task.dataVencimento}</p>
    </div>
  )
}

import { useDroppable } from "@dnd-kit/core";

const Column = ({ status, title, tasks }: { status: Task['status'], title: string, tasks: Task[] }) => {
  const { setNodeRef } = useDroppable({
    id: `column-${status}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-[#EEEEEE] p-4 rounded-lg shadow-md w-[375px] min-h-[500px]"
    >
      <h2 className="text-xl font-semibold mb-4 pb-2 text-center">{title}</h2>
      <SortableContext items={tasks.map(t => `task-${t.id}`)} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
      {tasks.length === 0 && <p className="text-gray-500 p-3">Nenhuma tarefa.</p>}
    </div>
  )
}


const updateTaskStatusInBackend = async (taskId: number, newStatus: Task['status']) => {
  const token = getCookie('access_token');
  if (!token) {
    console.error("Token de autenticação não encontrado.");
    return;
  }
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  try {
    await axios.patch(`http://localhost:8080/task/update/${taskId}`, { status: newStatus }, { headers });
    console.log(`Status da tarefa ${taskId} atualizado para ${newStatus}`)
  } catch (error) {
    console.error("Erro ao atualizar o status da tarefa:", error)
  }
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
      const headers = { 'Authorization': `Bearer ${token}` }
      const response = await axios.get(`http://localhost:8080/project/${Number(projectId)}/task`, { headers })
      setTasks(response.data)
    } catch (error) {
      console.error(error)
      router.push('/Singin')
    } finally {
      setLoading(false)
    }
  }

 const handleDragEnd = async (event: DragEndEvent) => {
  const { over, active } = event;
  if (!over) return;

  // se caiu em uma coluna
  if (over.id.toString().startsWith("column-")) {
    const destinationStatus = over.id.toString().replace("column-", "") as Task['status'];
    const activeTaskId = Number(active.id.toString().replace("task-", ""));
    const activeTask = tasks.find(t => t.id === activeTaskId);
    if (!activeTask) return;

    if (activeTask.status !== destinationStatus) {
      const updatedTasks = tasks.map(task =>
        task.id === activeTaskId ? { ...task, status: destinationStatus } : task
      );
      setTasks(updatedTasks);

      await updateTaskStatusInBackend(activeTask.id, destinationStatus);
    }
  }
};



  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  useEffect(() => { if (projectId) fetchTasks() }, [projectId])

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <p>A carregar tarefas...</p>
    </div>
  )

  const pendingTasks = tasks.filter(t => t.status === 'PENDENTE')
  const inProgressTasks = tasks.filter(t => t.status === 'EM_ANDAMENTO')
  const completedTasks = tasks.filter(t => t.status === 'CONCLUIDA')

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-3 gap-10 ">
          <Column status="PENDENTE" title="PENDENTE" tasks={pendingTasks} />
          <Column status="EM_ANDAMENTO" title="EM ANDAMENTO" tasks={inProgressTasks} />
          <Column status="CONCLUIDA" title="CONCLUIDO" tasks={completedTasks} />
        </div>
      </div>
    </DndContext>

  )
}
