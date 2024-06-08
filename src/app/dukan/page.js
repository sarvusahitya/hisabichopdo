import Image from "next/image";

export default function DukanLandingPage() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <h1 className="mb-3 text-2xl font-semibold">દુકાન</h1>
      <div className=" grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 inline-block text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={``}>
            આવક{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>

        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={``}>
            જાવક{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
      </div>
    </main>
  );
}
