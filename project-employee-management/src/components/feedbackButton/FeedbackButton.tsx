import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function FeedbackButton() {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const handleSend = () => {
        console.log("Avis envoyé :", message)
        setOpen(false)
        setMessage("")
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg rounded-full px-5 py-3"
            >
                💬 Donner un avis
            </Button>


            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Votre avis nous intéresse !</DialogTitle>
                    </DialogHeader>

                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Écrivez ici..."
                        className="min-h-[100px]"
                    />

                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            onClick={handleSend}
                        >
                            Envoyer
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
