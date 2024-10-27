"use client";
import Image from "next/image";

import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Page() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating document...",
      success: "New Document created",
      error: "Failed to create a new document",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src="/empty.png"
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Empty"
        width={300}
        height={300}
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s {user?.lastName}
      </h2>
      <Button className="mt-4" onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-1" />
        Create note
      </Button>
    </div>
  );
}

export default Page;
