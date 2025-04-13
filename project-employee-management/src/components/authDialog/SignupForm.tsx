import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

// Schéma de validation Zod pour l'inscription
const signupSchema = z.object({
  username: z.string().min(3,"Nom d'utilisateur trop court"),
  password: z.string().min(6, "Mot de passe trop court"),
  confirmPassword: z.string().min(6, "Confirmer le mot de passe est requis"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

export default function SignupForm({ onClose }: { onClose: () => void }) {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" }
  })

  const onSubmit = (data: any) => {
    console.log("Inscription:", data)
    // Ici, vous pouvez envoyer les données au backend
    onClose()
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
              <FormControl><Input  className="focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" {...field} /></FormControl>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl><Input   className="focus:ring-2 focus:ring-blue-500 focus:outline-none" type="password" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">S'inscrire</Button>
      </form>
    </Form>
  )
}
