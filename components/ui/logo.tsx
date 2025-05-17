import Image from "next/image";
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
    <div className="flex items-center">
      <Link href={"/"}>
        <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-1">
          <Image
            src="/voca-lingo.png"
            width={size || 50}
            height={size || 50}
            alt="Logo"
          />{" "}
          {!hideText && <h1 className={`text-4xl ${className}`}>VocaLingo</h1>}
        </div>
      </Link>
    </div>
  );
};

export default Logo;
