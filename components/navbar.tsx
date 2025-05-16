import { AuthButtons } from "./auth-buttons";
import Logo from "./ui/logo";

export default function Navbar() {
  return (
    <header className="container w-full mx-auto px-4 py-4 sticky top-0 border-border z-30 bg-background bg-opacity-10">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        <AuthButtons />
      </nav>
    </header>
  );
}
