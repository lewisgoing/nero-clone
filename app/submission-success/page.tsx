import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink } from "lucide-react"

export default function SubmissionSuccess() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Submission Successful!</CardTitle>
          <CardDescription>Your track has been submitted for review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">Submission Details</h3>
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                Priority
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Track:</span>
                <span className="font-medium">Midnight Dreams</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Artist:</span>
                <span className="font-medium">CloudNine</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session:</span>
                <span className="font-medium">Friday Beat Reviews</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Queue Position:</span>
                <span className="font-medium">#4 (Priority)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Review Time:</span>
                <span className="font-medium">8:45 PM EST</span>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="mb-2 font-medium">What's Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Your track is now in the queue for review</li>
              <li>• The session will be streamed live on Twitch at 8:00 PM EST</li>
              <li>• You'll receive an email notification when your track is about to be reviewed</li>
              <li>• After the session, you can access a recording of your review in your account</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" asChild>
            <Link href="https://twitch.tv/producer-mike" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Watch Live Stream
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
