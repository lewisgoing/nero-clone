"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { createSession } from "@/app/actions/sessions"

export default function CreateSession() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  return (
    <div className="container mx-auto flex min-h-screen flex-col px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Create New Session</h1>
        <p className="text-muted-foreground">Configure your live music review session</p>
      </header>

      <div className="mx-auto w-full max-w-3xl">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" onClick={() => setStep(1)}>
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="submissions" onClick={() => setStep(2)}>
              Submission Rules
            </TabsTrigger>
            <TabsTrigger value="pricing" onClick={() => setStep(3)}>
              Pricing
            </TabsTrigger>
          </TabsList>

          <form action={createSession}>
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Session Information</CardTitle>
                  <CardDescription>Set up the basic details for your review session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-name">Session Name</Label>
                    <Input id="session-name" name="session-name" placeholder="e.g., Friday Beat Reviews" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-description">Description</Label>
                    <Textarea
                      id="session-description"
                      name="session-description"
                      placeholder="Describe what type of music you'll be reviewing and any specific guidelines"
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="session-date">Date</Label>
                      <Input id="session-date" name="session-date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-time">Time</Label>
                      <Input id="session-time" name="session-time" type="time" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-duration">Estimated Duration</Label>
                    <Select defaultValue="60" name="session-duration">
                      <SelectTrigger id="session-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="public-session">Public Session</Label>
                      <p className="text-sm text-muted-foreground">Allow anyone to join and watch</p>
                    </div>
                    <Switch id="public-session" name="public-session" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.push("/")}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={() => setStep(2)}>
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="submissions">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Requirements</CardTitle>
                  <CardDescription>Define what artists need to provide when submitting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Accepted File Formats</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="mp3"
                          name="mp3"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <Label htmlFor="mp3" className="text-sm font-normal">
                          MP3
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="wav"
                          name="wav"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <Label htmlFor="wav" className="text-sm font-normal">
                          WAV
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="aiff" name="aiff" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="aiff" className="text-sm font-normal">
                          AIFF
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="flac" name="flac" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="flac" className="text-sm font-normal">
                          FLAC
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                    <Select defaultValue="15" name="max-file-size">
                      <SelectTrigger id="max-file-size">
                        <SelectValue placeholder="Select max size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 MB</SelectItem>
                        <SelectItem value="10">10 MB</SelectItem>
                        <SelectItem value="15">15 MB</SelectItem>
                        <SelectItem value="20">20 MB</SelectItem>
                        <SelectItem value="30">30 MB</SelectItem>
                        <SelectItem value="50">50 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-time">Review Time Per Track (seconds)</Label>
                    <input type="hidden" name="review-time" value="90" />
                    <div className="pt-6">
                      <Slider defaultValue={[90]} max={300} step={15} />
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>30s</span>
                        <span>90s</span>
                        <span>5m</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Required Metadata</Label>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="artist-name"
                          name="artist-name"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <Label htmlFor="artist-name" className="text-sm font-normal">
                          Artist Name
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="track-title"
                          name="track-title"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <Label htmlFor="track-title" className="text-sm font-normal">
                          Track Title
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="genre"
                          name="genre"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                        <Label htmlFor="genre" className="text-sm font-normal">
                          Genre
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="specific-feedback"
                          name="specific-feedback"
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="specific-feedback" className="text-sm font-normal">
                          Specific Feedback Request
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="social-links"
                          name="social-links"
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="social-links" className="text-sm font-normal">
                          Social Media Links
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-links">Allow External Links</Label>
                      <p className="text-sm text-muted-foreground">Let artists submit SoundCloud, YouTube, etc.</p>
                    </div>
                    <Switch id="allow-links" name="allow-links" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setStep(1)}>
                    Previous
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Monetization</CardTitle>
                  <CardDescription>Set up pricing for standard and priority submissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-payments">Enable Paid Submissions</Label>
                      <p className="text-sm text-muted-foreground">Allow artists to pay for submissions</p>
                    </div>
                    <Switch id="enable-payments" name="enable-payments" defaultChecked />
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <h3 className="text-sm font-medium">Standard Submission</h3>
                      <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">Basic</div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="standard-price">Price ($)</Label>
                      <Input
                        id="standard-price"
                        name="standard-price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        defaultValue="5.00"
                      />
                      <p className="text-xs text-muted-foreground">Set to 0 for free submissions</p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <h3 className="text-sm font-medium">Priority Submission</h3>
                      <div className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">Premium</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enable-priority">Enable Priority Queue</Label>
                          <p className="text-sm text-muted-foreground">Allow premium placements</p>
                        </div>
                        <Switch id="enable-priority" name="enable-priority" defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority-price">Priority Price ($)</Label>
                        <Input
                          id="priority-price"
                          name="priority-price"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          defaultValue="15.00"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority-benefits">Priority Benefits</Label>
                        <Textarea
                          id="priority-benefits"
                          name="priority-benefits"
                          placeholder="e.g., Guaranteed review, longer feedback, etc."
                          defaultValue="Guaranteed review, placed at the top of the queue, extended feedback time (2 minutes)"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-gray-50 p-4">
                    <div className="flex items-start gap-2">
                      <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        <p>Nero charges a 5% platform fee on all paid submissions.</p>
                        <p className="mt-1">
                          Payments are processed securely and funds will be available for withdrawal after the session.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setStep(2)}>
                    Previous
                  </Button>
                  <Button type="submit">Create Session</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  )
}
