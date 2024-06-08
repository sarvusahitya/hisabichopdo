import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div className=" grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <Link
          href={"/dukan"}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          {" "}
          <h2 className={`mb-3 text-2xl font-semibold`}>
            દુકાન નો હિસાબ{" "}
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              દુકાન ની આવક જાવક અને બધા વેપારી ના માલ વેચાણ સાથેની વિગતો{" "}
            </p>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>
      </div>
    </main>
  );
}
