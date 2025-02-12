import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Product, InsertProduct, insertProductSchema } from "@shared/schema";
import { AlertCircle, Edit, Save, X, Trash2, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUpload } from "@/components/ui/file-upload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductsResponse {
  message: string;
  count: number;
  data: Product[];
}

interface EditingProduct extends Product {
  isEditing: boolean;
  tempData: Partial<InsertProduct>;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [editingProducts, setEditingProducts] = useState<Record<number, EditingProduct>>({});
  const [uploadingImage, setUploadingImage] = useState<Record<number, boolean>>({});
  const [newProduct, setNewProduct] = useState<Partial<InsertProduct>>({
    name: "",
    description: "",
    price: 0,
    inventory: 0,
    imageUrls: [],
  });

  const { data: productsResponse, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ['/api/products'],
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProduct> }) => {
      const response = await apiRequest("PATCH", `/api/products/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async ({ id, files }: { id: number; files: File[] }) => {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(`/api/products/${id}/images`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Success",
        description: "Images uploaded successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async ({ productId, filename }: { productId: number; filename: string }) => {
      const response = await apiRequest("DELETE", `/api/products/${productId}/images/${filename}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/products/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: InsertProduct) => {
      const response = await apiRequest("POST", "/api/products", product);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        inventory: 0,
        imageUrls: [],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = async (productId: number, files: File[]) => {
    setUploadingImage(prev => ({ ...prev, [productId]: true }));
    try {
      await uploadImageMutation.mutateAsync({ id: productId, files });
    } finally {
      setUploadingImage(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleImageDelete = async (productId: number, imageUrl: string) => {
    const filename = imageUrl.split('/').pop();
    if (!filename) return;

    try {
      await deleteImageMutation.mutateAsync({ productId, filename });
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const startEditing = (product: Product) => {
    setEditingProducts(prev => ({
      ...prev,
      [product.id]: {
        ...product,
        isEditing: true,
        tempData: {},
      },
    }));
  };

  const cancelEditing = (productId: number) => {
    setEditingProducts(prev => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
  };

  const handleInputChange = (productId: number, field: keyof InsertProduct, value: any) => {
    setEditingProducts(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        tempData: {
          ...prev[productId].tempData,
          [field]: value,
        },
      },
    }));
  };

  const saveChanges = async (productId: number) => {
    const editingProduct = editingProducts[productId];
    if (!editingProduct) return;

    const product = productsResponse?.data.find(p => p.id === productId);
    if (!product) return;

    const changedFields = Object.entries(editingProduct.tempData).filter(([key, value]) => {
      if (key === 'price' || key === 'inventory') {
        return parseFloat(String(value)) !== product[key];
      }
      return value !== product[key as keyof typeof product];
    });

    if (changedFields.length === 0) {
      toast({
        title: "No changes made",
        description: "Please make some changes before saving",
      });
      return;
    }

    const updatedData = Object.fromEntries(changedFields);

    try {
      await updateProductMutation.mutateAsync({
        id: productId,
        data: updatedData,
      });
      cancelEditing(productId);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleCreateProduct = () => {
    try {
      // Generate a unique SKU if not provided
      const productData = {
        ...newProduct,
        sku: newProduct.sku || `SB-${Date.now()}`,
      };

      const validatedProduct = insertProductSchema.parse(productData);
      createProductMutation.mutate(validatedProduct);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Validation Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const renderNewProductForm = () => (
    <div className="space-y-4">
      <Input
        placeholder="Product name"
        value={newProduct.name}
        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
      />
      <Textarea
        placeholder="Product description"
        value={newProduct.description}
        onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
      />
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
        />
        <Input
          type="number"
          placeholder="Inventory"
          value={newProduct.inventory}
          onChange={(e) => setNewProduct(prev => ({ ...prev, inventory: parseInt(e.target.value) }))}
        />
      </div>
      <FileUpload
        onFileSelected={(files) => setNewProduct(prev => ({
          ...prev,
          imageUrls: [...(prev.imageUrls || []), ...files.map(() => '')] // Placeholder URLs for validation
        }))}
        imageUrls={newProduct.imageUrls || []}
      />
    </div>
  );

  const renderProductCard = (product: Product) => {
    const editingProduct = editingProducts[product.id];
    const isEditing = editingProduct?.isEditing;
    const isUploading = uploadingImage[product.id];

    return (
      <Card key={product.id} className="relative">
        <CardHeader>
          {isEditing ? (
            <>
              <Input
                defaultValue={product.name}
                onChange={(e) => handleInputChange(product.id, 'name', e.target.value)}
                className="font-semibold text-lg mb-2"
                placeholder="Product name"
              />
              <Input
                type="number"
                defaultValue={product.price}
                onChange={(e) => handleInputChange(product.id, 'price', parseFloat(e.target.value))}
                className="w-32"
                placeholder="Price"
              />
            </>
          ) : (
            <>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                defaultValue={product.description}
                onChange={(e) => handleInputChange(product.id, 'description', e.target.value)}
                className="mb-2"
                placeholder="Product description"
              />
              <Input
                type="number"
                defaultValue={product.inventory}
                onChange={(e) => handleInputChange(product.id, 'inventory', parseInt(e.target.value))}
                className="w-32"
                placeholder="Inventory"
              />
              <FileUpload
                onFileSelected={(files) => handleImageUpload(product.id, files)}
                onImageDelete={url => handleImageDelete(product.id, url)}
                uploading={isUploading}
                imageUrls={product.imageUrls || []}
                className="mt-4"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {product.imageUrls.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt={product.name}
                      className="w-full h-auto rounded-md"
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">No images available</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="text-sm mt-2">Stock: {product.inventory}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => cancelEditing(product.id)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => saveChanges(product.id)}
                disabled={updateProductMutation.isPending}
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </>
          ) : (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product
                      and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteProductMutation.mutate(product.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                variant="outline"
                size="sm"
                onClick={() => startEditing(product)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
  };

  const renderProductsTab = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-[300px]" />
              </CardContent>
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

    return (
      <div className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the product details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {renderNewProductForm()}
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleCreateProduct}
                disabled={createProductMutation.isPending}
              >
                {createProductMutation.isPending ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {!productsResponse?.data?.length ? (
          <Alert>
            <AlertTitle>No Products</AlertTitle>
            <AlertDescription>
              No products found. Add some products to get started.
            </AlertDescription>
          </Alert>
        ) : (
          productsResponse.data.map(renderProductCard)
        )}
      </div>
    );
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Manage your store's products, orders, and customers
        </p>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Products Overview</CardTitle>
              <CardDescription>
                View and manage your store's products
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderProductsTab()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
              <CardDescription>
                View and manage customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Orders management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                View and manage customer accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Customer management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}