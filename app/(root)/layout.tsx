import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
