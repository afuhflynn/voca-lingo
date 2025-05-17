import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | VocaLingo",
  description: "Signin with a preferred auth provider.",
};
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen overflow-hidden">{children}</div>;
}
