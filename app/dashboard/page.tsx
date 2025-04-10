"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Filter,
  Headphones,
  MoreVertical,
  Music,
  Play,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Mock data for the dashboard
const upcomingSessions = [
  {
    id: "1",
    name: "Friday Beat Reviews",
    date: "2025-04-12",
    time: "19:00",
    submissions: 12,
    priority: 3,
  },
  {
    id: "2",
    name: "Producer Feedback Session",
    date: "2025-04-15",
    time: "20:00",
    submissions: 5,
    priority: 1,
  },
]

const submissionQueue = [
  {
    id: "sub1",
    artist: "CloudNine",
    title: "Midnight Dreams",
    genre: "Electronic",
    submitted: "2 hours ago",
    isPriority: true,
    status: "queued",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sub2",
    artist: "Lyrical Flow",
    title: "City Lights",
    genre: "Hip Hop",
    submitted: "3 hours ago",
    isPriority: false,
    status: "queued",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sub3",
    artist: "Melody Maker",
    title: "Ocean Waves",
    genre: "Ambient",
    submitted: "5 hours ago",
    isPriority: false,
    status: "queued",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sub4",
    artist: "Beat Master",
    title: "Urban Jungle",
    genre: "Trap",
    submitted: "6 hours ago",
    isPriority: true,
    status: "queued",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sub5",
    artist: "Sonic Vision",
    title: "Neon Lights",
    genre: "Synthwave",
    submitted: "8 hours ago",
    isPriority: false,
    status: "queued",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Dashboard() {
  const [activeSession, setActiveSession] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Nero.</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-1 gap-8 px-4 py-8">
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <nav className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Dashboard</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium"
                  >
                    <Music className="h-4 w-4" />
                    Sessions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <BarChart className="h-4 w-4" />
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/earnings"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <DollarSign className="h-4 w-4" />
                    Earnings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/calendar"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Library</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/history"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <Clock className="h-4 w-4" />
                    Session History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/submissions"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <Headphones className="h-4 w-4" />
                    Past Submissions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Account</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <Users className="h-4 w-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <main className="flex-1">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Music Review Sessions</h1>
              <p className="text-muted-foreground">Manage your upcoming and active review sessions</p>
            </div>
            <Link href="/create-session">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Session
              </Button>
            </Link>
          </div>

          {activeSession ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => setActiveSession(null)}>
                    Back to Sessions
                  </Button>
                  <h2 className="text-xl font-semibold">Friday Beat Reviews</h2>
                  <Badge variant="outline" className="ml-2">
                    Live
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="queue">
                ltValue="queue">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="queue">Queue</TabsTrigger>
                  <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                  <TabsTrigger value="settings">Session Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="queue" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Input placeholder="Search submissions..." className="w-64" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">5 submissions in queue</span>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 hover:bg-accent">
                      <div className="flex items-center gap-4">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="CloudNine" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Midnight Dreams</h3>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                            Priority
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>CloudNine</span>
                          <span>•</span>
                          <span>Electronic</span>
                          <span>•</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Play Next</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Skip</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {submissionQueue.slice(1).map((submission) => (
                      <div
                        key={submission.id}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t p-4 hover:bg-accent"
                      >
                        <div className="flex items-center gap-4">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Avatar>
                            <AvatarImage src={submission.avatar} alt={submission.artist} />
                            <AvatarFallback>{submission.artist.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{submission.title}</h3>
                            {submission.isPriority && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                Priority
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{submission.artist}</span>
                            <span>•</span>
                            <span>{submission.genre}</span>
                            <span>•</span>
                            <span>{submission.submitted}</span>
                          </div>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Play Next</DropdownMenuItem>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Skip</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviewed" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Input placeholder="Search reviewed tracks..." className="w-64" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">0 tracks reviewed</span>
                    </div>
                  </div>

                  <div className="rounded-md border p-8 text-center">
                    <h3 className="text-lg font-medium">No tracks reviewed yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Tracks will appear here after you review them</p>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Session Controls</CardTitle>
                      <CardDescription>Manage your active session</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Session Status</h3>
                          <p className="text-sm text-muted-foreground">Currently live and accepting submissions</p>
                        </div>
                        <Button variant="destructive">End Session</Button>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Session Progress</h3>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>5 tracks remaining</span>
                            <span>0 of 5 reviewed</span>
                          </div>
                          <Progress value={0} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Submission Controls</h3>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="accept-submissions">Accept New Submissions</Label>
                            <input type="checkbox" id="accept-submissions" className="h-4 w-4" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="accept-priority">Accept Priority Submissions</Label>
                            <input type="checkbox" id="accept-priority" className="h-4 w-4" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Share Session</CardTitle>
                      <CardDescription>Let artists submit to your session</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-link">Session Link</Label>
                        <div className="flex gap-2">
                          <Input id="session-link" value="https://nero.fan/s/friday-beat-reviews" readOnly />
                          <Button variant="outline">Copy</Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Share on Social Media</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled music review sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between rounded-md border p-4">
                          <div>
                            <h3 className="font-medium">{session.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(session.date).toLocaleDateString()}</span>
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Music className="h-3 w-3 text-muted-foreground" />
                              <span>{session.submissions} submissions</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-amber-500" />
                              <span>{session.priority} priority</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setActiveSession(session.id)}>
                              Manage
                            </Button>
                            <Button size="sm">Go Live</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md border p-8 text-center">
                      <h3 className="text-lg font-medium">No upcoming sessions</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Create a new session to get started</p>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        New Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest sessions and submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-gray-100 p-2">
                          <Music className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">New submission received</p>
                          <p className="text-sm text-muted-foreground">CloudNine submitted "Midnight Dreams"</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-gray-100 p-2">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Payment received</p>
                          <p className="text-sm text-muted-foreground">$15.00 for priority submission</p>
                          <p className="text-xs text-muted-foreground">3 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-gray-100 p-2">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Session scheduled</p>
                          <p className="text-sm text-muted-foreground">Producer Feedback Session on April 15</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                    <CardDescription>Overview of your platform activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Total Sessions</div>
                        <div className="mt-1 text-2xl font-bold">12</div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Total Submissions</div>
                        <div className="mt-1 text-2xl font-bold">156</div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Total Earnings</div>
                        <div className="mt-1 text-2xl font-bold">$1,245</div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Avg. Rating</div>
                        <div className="mt-1 flex items-center text-2xl font-bold">
                          4.8
                          <Star className="ml-1 h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
