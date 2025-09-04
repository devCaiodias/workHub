'use client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const router = useRouter()

  const handleCreateProject = async () => {
    try {
      const token = getCookie('access_token')
      if (!token) {
        router.push('/Signin')
        return
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      }
      await axios.post('http://localhost:8080/project/create', {
        name,
        description,
        imgUrl
      }, {headers})
      setName('')
      setDescription('')
      setImgUrl('')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#F0F0F0] w-[375px] h-[58px] flex items-center justify-start pl-4 cursor-pointer hover:bg-gray-300" variant="outline">+ New Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={e => { e.preventDefault(); handleCreateProject(); }}>
              <DialogHeader>
                <DialogTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Create Project</DialogTitle>
                <DialogDescription className="scroll-m-20 text-xl font-semibold tracking-tight pl-5 mb-4">
                  Created your new project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Input id="name" placeholder="name Project" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="grid gap-3">
                  <Input id="imgUrl" placeholder="image Project" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                </div>
              </div>
              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer">Create</Button>
              </DialogFooter>
          </form>
            </DialogContent>
        </Dialog>
  )
}
