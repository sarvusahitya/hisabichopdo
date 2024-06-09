import Link from "next/link";

import { NextSeo } from "next-seo";

import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white p-4 shadow-md bg-customBackground">
      <div className="container mx-auto flex justify-center items-center"  >
        {/* Centering the content horizontally and vertically */}
        {/* Logo on the left */}
        <div className="text-center " >
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
