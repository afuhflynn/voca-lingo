import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";

const Logo = ({
  hideText,
  className,
  size,
}: {
  hideText?: boolean;
  className?: string;
  size?: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Globe className={cn("h-8 w-8 text-indigo-500", size)} />
        {!hideText && (
          <span
            className={`text-2xl font-bold gradient-text hidden sm:block ${className}`}
            style={{ fontSize: size }}
          >
            VocaLingo
          </span>
        )}
      </Link>
    </div>
  );
};

export default Logo;
