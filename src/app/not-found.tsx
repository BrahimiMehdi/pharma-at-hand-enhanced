export default async function NotFound() {
  
  return (
      <main className="flex bg-background gap-y-8 min-h-screen relative flex-col items-center justify-center px-12 ">
        <h1 className="text-8xl font-bold">Coming <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              soon
            </span></h1>
            <img className="w-full max-w-xl" src="/404-lab.svg" alt="" />
    </main>
  );
}
