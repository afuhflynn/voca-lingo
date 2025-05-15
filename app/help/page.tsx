import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquareText } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions and get support</p>
      </div>

      <div className="flex items-center">
        <Input placeholder="Search for help..." className="max-w-sm" />
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to the most common questions about Vox</CardDescription>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate is the transcription?</AccordionTrigger>
                  <AccordionContent>
                    Vox uses state-of-the-art speech recognition technology that achieves over 95% accuracy for clear
                    audio in supported languages. Factors that can affect accuracy include background noise, accent, and
                    audio quality.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What languages are supported?</AccordionTrigger>
                  <AccordionContent>
                    Currently, Vox supports English (US and UK), Spanish, French, German, and Japanese. We're
                    continuously adding support for more languages.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Is my data secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take data security seriously. All audio recordings and transcriptions are encrypted both in
                    transit and at rest. You can also choose to disable cloud storage in the settings if you prefer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I export my transcriptions?</AccordionTrigger>
                  <AccordionContent>
                    You can export any transcription by opening it and clicking the "Export" button. Vox supports
                    exporting to TXT, DOC, and PDF formats.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>What is the AI Coach feature?</AccordionTrigger>
                  <AccordionContent>
                    The AI Coach is an intelligent assistant that provides personalized productivity tips and insights.
                    It can help you optimize your workflow, manage your time better, and achieve your goals more
                    efficiently.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Step-by-step guides to help you get the most out of Vox</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="#" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Getting Started with Vox</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn the basics of recording and transcribing voice memos
                  </p>
                </Link>

                <Link href="#" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Advanced Transcription Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover how to edit, format, and export your transcriptions
                  </p>
                </Link>

                <Link href="#" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Using the AI Coach</h3>
                  <p className="text-sm text-muted-foreground">Get the most out of your AI productivity assistant</p>
                </Link>

                <Link href="#" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Customizing Your Experience</h3>
                  <p className="text-sm text-muted-foreground">Learn how to configure Vox to suit your preferences</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Detailed description of your issue" rows={5} />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/chat">
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Chat with AI Support
                </Link>
              </Button>
              <Button>Submit Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

function Textarea({ id, placeholder, rows = 3 }: { id: string; placeholder?: string; rows?: number }) {
  return (
    <textarea
      id={id}
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeholder}
      rows={rows}
    />
  )
}

