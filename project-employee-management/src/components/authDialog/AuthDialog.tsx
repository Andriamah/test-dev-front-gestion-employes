// components/AuthDialog.tsx
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import {User} from 'lucide-react'; // Exemple d'icône Lucide


export default function AuthDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (val: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>

          <DialogTitle className="flex items-center justify-center text-blue-600 font-bold text-lg space-x-2">
            <User className="h-6 w-6" /> {/* Icône Lucide */}
            <span>Bienvenue !</span>
          </DialogTitle>

        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onClose={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm onClose={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  )
}
