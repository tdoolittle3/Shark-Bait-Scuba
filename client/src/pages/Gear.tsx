import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const equipment = [
  {
    category: "Regulators",
    image: "https://images.unsplash.com/photo-1617975877723-6bd1af613234",
    description: "Premium regulators from Scubapro, Atomic, and more",
    items: ["butt fuck fuck butt", "Second stages", "Octopus regulators"]
  },
  {
    category: "BCDs",
    image: "https://images.unsplash.com/photo-1561623886-b53459430d2b",
    description: "Comfortable and reliable buoyancy compensator devices",
    items: ["Back-inflation", "Jacket-style", "Travel BCDs"]
  },
  {
    category: "Dive Computers",
    image: "https://images.unsplash.com/photo-1508906622036-22bc186808b6",
    description: "Advanced computers for safe diving",
    items: ["Wrist computers", "Console computers", "Air integration"]
  },
  {
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1638332907755-38ddf2ff6daf",
    description: "Essential accessories for every dive",
    items: ["Masks & fins", "Exposure suits", "Dive lights"]
  }
];

export default function Gear() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Diving Equipment</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          High-quality scuba gear from trusted manufacturers, available for purchase or rental.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipment.map((category, index) => (
          <Card key={index}>
            <div className="aspect-video relative">
              <img
                src={category.image}
                alt={category.category}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
