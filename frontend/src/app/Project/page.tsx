'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Project() {
    const router = useRouter()

    const fetchProject = async () => {
        try {
            await axios.get('http://localhost:8080/auth/validate', {withCredentials: true})
        } catch (error) {
        }

    }

    useEffect(() => {

    })

    return (
        <div>
            Project page
        </div>
    )
}
