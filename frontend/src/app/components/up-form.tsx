import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SingupForm() {
    return (
        <form >
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" type="fullname" placeholder="name" required className="rounded-2xl p-5" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="user@gmail.com" required className="rounded-2xl p-5" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="******" required className="rounded-2xl p-5" />
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
                Don&apos;t have an account?{" "}
                <a href="/Singin" className="underline underline-offset-4">
                    Sign in
                </a>
            </div>
        </form>
    )
}