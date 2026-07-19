import { MessageCircle, Send } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import type { ClubLeader } from "@/types/club"

interface MessagePresidentDialogProps {
  president: ClubLeader
  clubName: string
}

export function MessagePresidentDialog({
  president,
  clubName,
}: MessagePresidentDialogProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTimeout(() => {
        setMessage("")
        setSent(false)
      }, 150)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline">
            <MessageCircle />
            Message
          </Button>
        }
      />
      <DialogContent>
        {sent ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Send className="size-5" />
            </div>
            <p className="text-sm font-medium">Message sent</p>
            <p className="text-sm text-muted-foreground">
              {president.name} will get back to you soon.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Message {president.name}</DialogTitle>
              <DialogDescription>
                {president.role}, {clubName}
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Ask ${president.name.split(" ")[0]} about ${clubName}...`}
              rows={4}
              autoFocus
            />
            <DialogFooter>
              <Button
                disabled={message.trim() === ""}
                onClick={() => setSent(true)}
              >
                <Send />
                Send
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
