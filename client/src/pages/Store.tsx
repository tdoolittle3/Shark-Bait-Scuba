import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

interface ProductsResponse {
  message: string;
  count: number;
  data: Product[];
}

export default function Store() {
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: productsResponse, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ['/api/products'],
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.imageUrls?.[0] || ''
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <p className="text-red-500">Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shark Bait Scuba Store</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get the best diving gear and accessories for your underwater adventures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsResponse?.data.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <img 
                  src={product.imageUrls[0]} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <Button 
                onClick={() => handleAddToCart(product)}
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}