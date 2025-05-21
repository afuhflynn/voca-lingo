"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { Trash2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { privateAxios } from "@/lib/axios.config";
import { useState } from "react";
import { User } from "@prisma/client";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth-client";

export default function SettingsPage() {
  const { data: session, isPending, error } = useSession();
  const user = session?.user;

  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
  });

  // call endpoint to update user data
  const handleUpdateUserDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingDetails(true);
    try {
      const res = await privateAxios.put<{ user: User; message: string }>(
        "/api/user/update-details",
        formData
      );
      toast({
        title: "Success updating details",
        description: res.data.message,
      });
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      console.error("Error updating user details:", error);
      if (error.response.data.message) {
        toast({
          title: "Error updating details",
          description: error.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error updating details",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsUpdatingDetails(false);
    }
  };

  const handleUpdateForm = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  if (error) {
    toast({
      description:
        error.message ||
        "Error connecting to our auth server to get your session. Check your internet connection.",
      variant: "destructive",
    });
  }

  if (isPending) {
    return null;
  }

  return (
    <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 py-6">
      <div className="container mx-auto w-full sm:px-36 flex flex-col gap-8">
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleUpdateUserDetails}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>

                  <Input
                    id="fullName"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      handleUpdateForm(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleUpdateForm(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="gradient-bg" disabled={isUpdatingDetails}>
                  {isUpdatingDetails ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>
              Manage your account status and data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Download Your Data</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Get a copy of all your personal data and learning history
                  </div>
                </div>
                <Button variant="outline" disabled>
                  Download
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild disabled>
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete your account? This
                        action cannot be undone and all your data will be
                        permanently removed.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          Deleting your account will erase all your progress,
                          achievements, and learning history.
                        </AlertDescription>
                      </Alert>
                    </div>
                    <div className="flex flex-col items-start py-4">
                      <Label className="mb-2" htmlFor="email">
                        <span>Email </span>
                        <span className="text-xs">
                          (Helps us ensure that the account delete is not
                          automated.)
                        </span>
                      </Label>
                      <Input
                        // value={formData.email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="johana@example.com"
                      />
                    </div>
                    <DialogFooter>
                      <DialogTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogTrigger>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
