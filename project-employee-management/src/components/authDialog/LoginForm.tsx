import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import authService from "@/services/auth.service" 
import { User } from "@/models/user" 
import { toast } from "sonner"
import { useNavigate } from "react-router-dom" 

const loginData = z.object({
  username: z.string().min(3, "Nom d'utilisateur trop court"),
  password: z.string().min(8, "Mot de passe trop court"),
})

type LoginData = z.infer<typeof loginData>

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  const form = useForm<LoginData>({
    resolver: zodResolver(loginData),
    defaultValues: { username: "", password: "" },
  })

  const onSubmit = async (data: LoginData) => {
    try {
      console.log("voiic ==>" ,data as User)

      const token = await authService.login(data as User)
      console.log("voiic ==>" ,data as User)
      console.log(" Token reçu :", token)
      toast.success("Connexion réussie ")
      onClose()
      navigate("/gestion-employes")
    } catch (error: any) {
      console.error("Erreur de connexion", error)
      setErrorMessage(error.message || "Vérifiez vos identifiants et essayez à nouveau")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl><Input
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              type="text"
              {...field}
            /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl><Input  className="focus:ring-2 focus:ring-blue-500 focus:outline-none" type="password" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Message d'erreur */}
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
        <Button bg-blue-600 hover:bg-blue-700type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Se connecter</Button>
      </form>
    </Form>
  )
}
