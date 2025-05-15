import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Vox</h1>
        <p className="text-muted-foreground">Learn more about Vox and the team behind it</p>
      </div>

      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Terms</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

            <CardHeader>
              <CardTitle>About Vox</CardTitle>
              <CardDescription>Our mission and vision</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p>
                  At Vox, our mission is to transform how people capture and process their spoken thoughts. We believe
                  that everyone should have access to powerful voice transcription technology that helps them be more
                  productive and creative.
                </p>

                <h3 className="text-xl font-semibold">Our Story</h3>
                <p>
                  Vox was founded in 2023 by a team of developers and designers who were frustrated with the limitations
                  of existing voice transcription tools. We set out to build a solution that was not only accurate and
                  reliable but also intuitive and enjoyable to use.
                </p>

                <h3 className="text-xl font-semibold">Our Technology</h3>
                <p>
                  Vox is built on cutting-edge speech recognition technology and artificial intelligence. Our platform
                  uses advanced machine learning algorithms to continuously improve transcription accuracy and provide
                  personalized productivity insights through our AI coach.
                </p>

                <div className="flex justify-center pt-4">
                  <Button asChild variant="outline">
                    <Link href="https://github.com/yourusername/vox" target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

            <CardHeader>
              <CardTitle>Our Team</CardTitle>
              <CardDescription>The people behind Vox</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-primary">{member.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

            <CardHeader>
              <CardTitle>Privacy & Terms</CardTitle>
              <CardDescription>Our commitment to your privacy and data security</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Privacy Policy</h3>
                <p>
                  At Vox, we take your privacy seriously. We only collect the data necessary to provide our services and
                  improve your experience. Your recordings and transcriptions are encrypted and stored securely.
                </p>

                <h3 className="text-xl font-semibold">Terms of Service</h3>
                <p>
                  By using Vox, you agree to our terms of service. These terms outline your rights and responsibilities
                  as a user, as well as our obligations to you.
                </p>

                <h3 className="text-xl font-semibold">Data Security</h3>
                <p>
                  We employ industry-standard security measures to protect your data. All audio recordings and
                  transcriptions are encrypted both in transit and at rest. You have full control over your data and can
                  delete it at any time.
                </p>

                <div className="flex gap-4 justify-center pt-4">
                  <Button asChild variant="outline">
                    <Link href="#">Full Privacy Policy</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="#">Terms of Service</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
  },
  {
    name: "Michael Chen",
    role: "CTO",
  },
  {
    name: "Emma Rodriguez",
    role: "Lead Designer",
  },
  {
    name: "David Kim",
    role: "AI Engineer",
  },
  {
    name: "Olivia Patel",
    role: "Product Manager",
  },
  {
    name: "James Wilson",
    role: "Full Stack Developer",
  },
]

