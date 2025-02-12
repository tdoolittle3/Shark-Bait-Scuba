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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Store() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

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

    if (!products?.length) {
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
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="line-clamp-1">{product.name}</CardTitle>
              <CardDescription className="text-lg font-semibold text-primary">
                ${product.price.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[200px] object-cover rounded-md"
                />
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
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shark Bait Scuba Store</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our collection of high-quality diving equipment and gear
        </p>
      </div>

      {renderContent()}
    </div>
  );
}