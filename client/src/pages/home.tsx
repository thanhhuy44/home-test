import { Button } from '../components/ui/button';
import { useSidebar } from '../components/ui/sidebar';

function Home() {
  const { setOpenMobile } = useSidebar();
  return (
    <main className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-xl lg:text-2xl font-semibold text-center">Welcome to NX Chat!</h1>
        <Button onClick={() => setOpenMobile(true)} className="mx-auto md:hidden" variant="outline">
          Start Conversation
        </Button>
      </div>
    </main>
  );
}

export default Home;
