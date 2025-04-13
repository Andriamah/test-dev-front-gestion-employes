import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Send, MessageCircle, PenTool } from 'lucide-react'

export default function FeedbackButton() {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const handleSend = () => {
        console.log("Avis envoyé :", message)
        setOpen(false)
        setMessage("") // Réinitialiser le message
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <button className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg rounded-full px-5 py-3">
                        <MessageCircle className="h-10 w-10" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none flex items-center space-x-2">
                                <PenTool className="h-10 w-10" />
                                <span className="font-bold text-[#002B5B]">Votre avis nous intéresse !</span>

                            </h4>
                            <p className="text-sm text-muted-foreground">Anonyme (Mais soyez courtois)</p>
                        </div>
                        <div className="grid gap-2">
                            <Textarea
                                placeholder="Votre message ..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center space-x-2"
                            onClick={handleSend}
                        >
                            <Send className="h-5 w-5" />
                            <span>Envoyer</span>
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}
