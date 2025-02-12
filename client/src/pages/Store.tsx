import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";
import { AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface ProductsResponse {
  message: string;
  count: number;
  data: Product[];
}

export default function Store() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: productsResponse, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ['/api/products'],
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const showGallery = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProduct?.imageUrls) return;
    setCurrentImageIndex((prev) => 
      prev === selectedProduct.imageUrls!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProduct?.imageUrls) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProduct.imageUrls!.length - 1 : prev - 1
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px] w-full rounded-md" />
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    if (!productsResponse?.data?.length) {
      return (
        <Alert>
          <AlertTitle>No Products Available</AlertTitle>
          <AlertDescription>
            Check back soon for our upcoming product catalog!
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productsResponse.data.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="line-clamp-1">{product.name}</CardTitle>
              <CardDescription className="text-lg font-semibold text-primary">
                ${product.price.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {product.imageUrls?.length ? (
                <div 
                  className="relative w-full h-[200px] overflow-hidden rounded-md cursor-pointer"
                  onClick={() => showGallery(product)}
                >
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.imageUrls.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      +{product.imageUrls.length - 1} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-[200px] bg-muted rounded-md flex items-center justify-center">
                  No image available
                </div>
              )}
              <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                {product.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                disabled={product.inventory <= 0}
              >
                {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shark Bait Scuba Store</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of high-quality diving equipment and gear
          </p>
        </div>

        {renderContent()}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => closeGallery()}>
        <DialogContent className="max-w-3xl">
          {selectedProduct?.imageUrls?.length && (
            <div className="relative aspect-square">
              <img
                src={selectedProduct.imageUrls[currentImageIndex]}
                alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={closeGallery}
              >
                <X className="h-4 w-4" />
              </Button>
              {selectedProduct.imageUrls.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {currentImageIndex + 1} / {selectedProduct.imageUrls.length}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}