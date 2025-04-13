import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const loginSchema = z.object({
  username: z.string().min(3,"Nom d'utilisateur trop court"),
  password: z.string().min(8, "Mot de passe trop court"),
})

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" }
  })

  const onSubmit = (data: any) => {
    console.log("Login:", data)
    // Ici, vous pourriez envoyer les données au backend
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
        <Button bg-blue-600 hover:bg-blue-700type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Se connecter</Button>
      </form>
    </Form>
  )
}
