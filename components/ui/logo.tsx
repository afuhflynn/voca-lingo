import Image from "next/image";
import Link from "next/link";

const Logo = ({ hideText }: { hideText?: boolean }) => {
  return (
    <div className="flex items-center">
      <Link href={"/"}>
        <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-1">
          <Image src="/voca-lingo.png" width={50} height={50} alt="Logo" />{" "}
          <h1 className="text-4xl">VocaLingo</h1>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
