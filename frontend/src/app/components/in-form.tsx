"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import * as zod from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { setCookie } from "cookies-next";

const SinginSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
})


export default function SinginForm() {
  const router = useRouter()

  const {
    register: login,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<zod.infer<typeof SinginSchema>>({
    resolver: zodResolver(SinginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: zod.infer<typeof SinginSchema>) => {
    try {
      // 1. Envie a requisição de login e obtenha a resposta
      const response = await axios.post("http://localhost:8080/auth/signin", data, {
        withCredentials: true,
      })

      // 2. Extraia o token da resposta
      const { access_token } = response.data;

      // 3. Armazene o token em um cookie
      setCookie('access_token', access_token, { maxAge: 60 * 60 * 24 }); // O cookie expira em 1 dia

      reset()
      router.push("/Project")
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input {...login("email")} id="email" type="email" placeholder="user@gmail.com" required className="rounded-2xl p-5" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input {...login("password")} id="password" type="password" placeholder="******" required className="rounded-2xl p-5" />
        </div>
        <Button type="submit" className="m-auto px-7 bg-[#F7CE4D] text-black hover:bg-amber-200">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/Singup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
