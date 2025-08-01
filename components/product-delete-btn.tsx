"use client";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/server/product";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteProductButtonProps {
  productId: number;
}

const DeleteProductBtn = ({ productId }: DeleteProductButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Button
          disabled={isLoading}
          variant="destructive"
          onClick={handleDelete}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductBtn;
