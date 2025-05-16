import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your app settings and preferences</p>
      </div>

      <div className="grid gap-6">
        <Card className="relative overflow-hidden border-2">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure general application settings</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Auto-save recordings</Label>
                <p className="text-sm text-muted-foreground">Automatically save recordings when stopped</p>
              </div>
              <Switch id="auto-save" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-transcribe">Auto-transcribe</Label>
                <p className="text-sm text-muted-foreground">Automatically transcribe recordings when completed</p>
              </div>
              <Switch id="auto-transcribe" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Transcription Language</Label>
              <Select defaultValue="en-US">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es-ES">Spanish</SelectItem>
                  <SelectItem value="fr-FR">French</SelectItem>
                  <SelectItem value="de-DE">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Recording Quality</Label>
              <Select defaultValue="high">
                <SelectTrigger id="quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (8kHz)</SelectItem>
                  <SelectItem value="medium">Medium (16kHz)</SelectItem>
                  <SelectItem value="high">High (24kHz)</SelectItem>
                  <SelectItem value="ultra">Ultra (48kHz)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Reset</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden border-2">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Configure your privacy preferences</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics">Usage Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous usage data collection to improve the app
                </p>
              </div>
              <Switch id="analytics" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cloud-backup">Cloud Backup</Label>
                <p className="text-sm text-muted-foreground">Store your recordings and transcriptions in the cloud</p>
              </div>
              <Switch id="cloud-backup" defaultChecked />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Reset</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

