import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export default function Store() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading products. Please try again later.</p>
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
        {products && products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <CheckoutButton 
                productId={product.id}
                className="w-full"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}