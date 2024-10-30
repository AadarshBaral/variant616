import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="header my-2 sm:my-4">
      <Link href="/" className="mr-4 flex justify-center items-center">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-foreground">
          Variant616
        </h1>
        <Image
          src="/images/variant616.svg"
          alt="logo"
          className="ml-4 h-10 w-10"
          width={60}
          height={60}
        />
      </Link>
    </div>
  );
}

export default Header;
