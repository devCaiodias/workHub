'use client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";
import { Label } from "./ui/label";


export default function CreateTasks() {
  const router = useRouter()
  const params = useParams();
  const projectId = params.projectId;
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false);


  const handleCreateTask = async () => {
    try {
      const token = getCookie('access_token')
      if (!token) {
        router.push('/Signin')
        return
      }
      const headers = { 'Authorization': `Bearer ${token}` }
      await axios.post('https://workhub-ns8j.onrender.com/task/create', {
        title,
        description,
        status,
        dataVencimento,
        projectId
      }, { headers })

      setTitle('')
      setDescription('')
      setStatus('')
      setDataVencimento('')
      setOpen(false)
      window.location.reload()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex m-auto mb-6">
        <Button className="bg-[#F0F0F0] cursor-pointer hover:bg-gray-300" variant="outline">
          + New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={e => { e.preventDefault(); handleCreateTask(); }}>
          <DialogHeader>
            <DialogTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Create Task
            </DialogTitle>
            <DialogDescription className="scroll-m-20 text-xl font-semibold tracking-tight pl-5 mb-5">
              Fill in the details of your new task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PENDENTE">PENDENTE</SelectItem>
                  <SelectItem value="EM_ANDAMENTO">EM ANDAMENTO</SelectItem>
                  <SelectItem value="CONCLUIDA">CONCLUIDA</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label>Due date</Label>
            <Input placeholder="Data de vencimento" type="date" value={dataVencimento} onChange={e => setDataVencimento(e.target.value)} />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
