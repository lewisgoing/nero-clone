"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Info, Music, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function JoinSession() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submissionType, setSubmissionType] = useState("standard")

  // Simulate upload progress
  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would submit the form data to the server
    router.push("/submission-success")
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Join Session: Friday Beat Reviews</h1>
        <p className="text-muted-foreground">Submit your track for review</p>
      </header>

      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Friday Beat Reviews</h2>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Live Now
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Hosted by Producer Mike</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Submissions close in:</p>
              <p className="text-lg font-bold">1 hour 23 minutes</p>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-4">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                <p>This session accepts MP3 and WAV files up to 15MB.</p>
                <p className="mt-1">All submissions will be reviewed live on Twitch at 8:00 PM EST.</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Track</TabsTrigger>
            <TabsTrigger value="link">Submit Link</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Track</CardTitle>
                  <CardDescription>MP3 or WAV files up to 15MB</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                        <Music className="mb-2 h-8 w-8 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Drag and drop your audio file</h3>
                        <p className="mb-4 text-sm text-muted-foreground">or click to browse files</p>
                        <Button variant="outline" onClick={simulateUpload}>
                          <Upload className="mr-2 h-4 w-4" />
                          Select File
                        </Button>
                      </div>

                      {uploadProgress > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Uploading track.mp3...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                          {uploadProgress === 100 && (
                            <p className="text-sm text-green-600">Upload complete! Click Next to continue.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="track-title">Track Title</Label>
                        <Input id="track-title" placeholder="Enter the title of your track" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="artist-name">Artist Name</Label>
                        <Input id="artist-name" placeholder="Your artist name or alias" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="genre">Genre</Label>
                        <Select defaultValue="electronic">
                          <SelectTrigger id="genre">
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronic">Electronic</SelectItem>
                            <SelectItem value="hip-hop">Hip Hop</SelectItem>
                            <SelectItem value="rnb">R&B</SelectItem>
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="rock">Rock</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="feedback-request">Specific Feedback Request (Optional)</Label>
                        <Textarea
                          id="feedback-request"
                          placeholder="Is there anything specific you'd like feedback on? (e.g., mixing, arrangement, vocals)"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="social-links">Social Media Links (Optional)</Label>
                        <Input id="social-links" placeholder="Instagram, Twitter, SoundCloud, etc." />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Submission Type</Label>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div
                            className={`cursor-pointer rounded-md border p-4 ${submissionType === "standard" ? "border-black bg-gray-50" : ""}`}
                            onClick={() => setSubmissionType("standard")}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="font-medium">Standard Submission</h3>
                              <Badge variant="outline">$5</Badge>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Added to regular queue</li>
                              <li>• 90 second review time</li>
                              <li>• Basic feedback</li>
                            </ul>
                          </div>

                          <div
                            className={`cursor-pointer rounded-md border p-4 ${submissionType === "priority" ? "border-black bg-gray-50" : ""}`}
                            onClick={() => setSubmissionType("priority")}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="font-medium">Priority Submission</h3>
                              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                                $15
                              </Badge>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Priority placement in queue</li>
                              <li>• 2 minute review time</li>
                              <li>• Detailed feedback</li>
                              <li>• Guaranteed review</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="flex cursor-pointer items-center gap-2 rounded-md border p-3">
                            <input type="radio" name="payment" id="card" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="card" className="cursor-pointer text-sm font-normal">
                              Credit Card
                            </Label>
                          </div>
                          <div className="flex cursor-pointer items-center gap-2 rounded-md border p-3">
                            <input type="radio" name="payment" id="paypal" className="h-4 w-4" />
                            <Label htmlFor="paypal" className="cursor-pointer text-sm font-normal">
                              PayPal
                            </Label>
                          </div>
                          <div className="flex cursor-pointer items-center gap-2 rounded-md border p-3">
                            <input type="radio" name="payment" id="apple-pay" className="h-4 w-4" />
                            <Label htmlFor="apple-pay" className="cursor-pointer text-sm font-normal">
                              Apple Pay
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-gray-50 p-4">
                        <h3 className="mb-2 font-medium">Order Summary</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span>{submissionType === "standard" ? "Standard" : "Priority"} Submission</span>
                          <span>${submissionType === "standard" ? "5.00" : "15.00"}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>${submissionType === "standard" ? "5.00" : "15.00"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step > 1 ? (
                    <Button variant="outline" type="button" onClick={() => setStep(step - 1)}>
                      Previous
                    </Button>
                  ) : (
                    <Button variant="outline" type="button" onClick={() => router.push("/")}>
                      Cancel
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={step === 1 && uploadProgress < 100}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button type="submit">Submit Track</Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="link">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Link</CardTitle>
                  <CardDescription>SoundCloud, YouTube, or other streaming platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="track-url">Track URL</Label>
                    <Input id="track-url" placeholder="https://soundcloud.com/your-track" required />
                    <p className="text-xs text-muted-foreground">Make sure your track is publicly accessible</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="track-title-link">Track Title</Label>
                    <Input id="track-title-link" placeholder="Enter the title of your track" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="artist-name-link">Artist Name</Label>
                    <Input id="artist-name-link" placeholder="Your artist name or alias" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genre-link">Genre</Label>
                    <Select defaultValue="electronic">
                      <SelectTrigger id="genre-link">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronic">Electronic</SelectItem>
                        <SelectItem value="hip-hop">Hip Hop</SelectItem>
                        <SelectItem value="rnb">R&B</SelectItem>
                        <SelectItem value="pop">Pop</SelectItem>
                        <SelectItem value="rock">Rock</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-request-link">Specific Feedback Request (Optional)</Label>
                    <Textarea
                      id="feedback-request-link"
                      placeholder="Is there anything specific you'd like feedback on? (e.g., mixing, arrangement, vocals)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Submission Type</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div
                        className={`cursor-pointer rounded-md border p-4 ${submissionType === "standard" ? "border-black bg-gray-50" : ""}`}
                        onClick={() => setSubmissionType("standard")}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">Standard Submission</h3>
                          <Badge variant="outline">$5</Badge>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Added to regular queue</li>
                          <li>• 90 second review time</li>
                          <li>• Basic feedback</li>
                        </ul>
                      </div>

                      <div
                        className={`cursor-pointer rounded-md border p-4 ${submissionType === "priority" ? "border-black bg-gray-50" : ""}`}
                        onClick={() => setSubmissionType("priority")}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">Priority Submission</h3>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">
                            $15
                          </Badge>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Priority placement in queue</li>
                          <li>• 2 minute review time</li>
                          <li>• Detailed feedback</li>
                          <li>• Guaranteed review</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="flex cursor-pointer items-center gap-2 rounded-md border p-3">
                        <input type="radio" name="payment-link" id="card-link" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="card-link" className="cursor-pointer text-sm font-normal">
                          Credit Card
                        </Label>
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-md border p-3">
                        <input type="radio" name="payment-link" id="paypal-link" className="h-4 w-4" />
                        <Label htmlFor="paypal-link" className="cursor-pointer text-sm font-normal">
                          PayPal
                        </Label>
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-md border p-3">
                        <input type="radio" name="payment-link" id="apple-pay-link" className="h-4 w-4" />
                        <Label htmlFor="apple-pay-link" className="cursor-pointer text-sm font-normal">
                          Apple Pay
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-medium">Order Summary</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span>{submissionType === "standard" ? "Standard" : "Priority"} Submission</span>
                      <span>${submissionType === "standard" ? "5.00" : "15.00"}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${submissionType === "standard" ? "5.00" : "15.00"}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full justify-between">
                    <Button variant="outline" type="button" onClick={() => router.push("/")}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Track</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  )
}
