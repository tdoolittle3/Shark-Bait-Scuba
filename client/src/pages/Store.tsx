import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.error) {
          console.error('Error:', data.error);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleCheckout = async (productId: string) => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    const session = await response.json();
    await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-12">No products available</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="mt-4">{product.description}</p>
              <p className="mt-2 text-xl font-bold">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleCheckout(product.id)}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}