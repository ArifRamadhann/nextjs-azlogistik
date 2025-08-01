import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Product } from "@/db/schema";
import { Button } from "./ui/button";
import DeleteProductBtn from "./product-delete-btn";
import ProductForm from "./forms/product-form";

interface ProductProps {
  product: Product;
}

export function ProductCard({ product }: ProductProps) {
  const imageId =
    product.id.toString().slice(-1) != "9" ||
    product.id.toString().slice(-1) != "0"
      ? product.id.toString().slice(-1)
      : 1;
  return (
    <Card className="@container/card">
      <CardHeader>
        <Image
          alt="pkm"
          width="1000"
          height="1000"
          src={`/products/${imageId}.jpg`}
        />
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {product.name}
        </div>
        <div className="flex justify-between w-full">
          <div>Rp {product.price.toLocaleString()}</div>
          <div className="text-muted-foreground">
            Stock: {product.stock.toLocaleString()}
          </div>
        </div>
        <div className="flex justify-end gap-2 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Add product to the Database
                </DialogDescription>
              </DialogHeader>
              <ProductForm product={product} />
            </DialogContent>
          </Dialog>

          <DeleteProductBtn productId={product.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
