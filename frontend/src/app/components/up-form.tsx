"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import * as zod from "zod"
import axios from "axios";

const SignupSchema = zod.object({
    fullname: zod.string().min(2, "Full name must be at least 2 characters long"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
})

export default function SingupForm() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<zod.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: zod.infer<typeof SignupSchema>) => {
        try {
            await axios.post("http://localhost:8080/users/singup", data, {
                withCredentials: true,
            })
            console.log("User registered successfully")
            reset()
            router.push("/Singin")
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input {...register("fullname")} id="fullname" type="text" placeholder="name" required className="rounded-2xl p-5" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="user@gmail.com" required className="rounded-2xl p-5" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input {...register("password")} id="password" type="password" placeholder="******" required className="rounded-2xl p-5" />
                </div>
                <Button type="submit" className="m-auto px-7 bg-[#F7CE4D] text-black hover:bg-amber-200">
                    Create
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/Singin" className="underline underline-offset-4">
                    Sign in
                </a>
            </div>
        </form>
    )
}