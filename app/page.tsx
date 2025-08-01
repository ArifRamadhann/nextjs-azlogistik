import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 mx-auto justify-center align-middle h-[100vh]">
      <h1 className="flex mx-auto">AZ Logistik - Technical Test App</h1>
      <div className="flex mx-auto">
        <Link href="/dashboard">
          <Button>To App</Button>
        </Link>
      </div>
    </div>
  );
}
