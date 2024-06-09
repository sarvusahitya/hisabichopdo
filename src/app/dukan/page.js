import Image from "next/image";
import Link from "next/link";
export default function DukanLandingPage() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <Link
        href={"/dukan/aavak"}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        {" "}
        <h2 className={`mb-3 text-2xl font-semibold`}>
          દુકાન આવક{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </Link>
      <Link
        href={"/dukan/javak"}
        className="group  rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        {" "}
        <h2 className={`mb-3 text-2xl font-semibold`}>
          દુકાન જાવક{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </Link>
    </main>
  );
}
