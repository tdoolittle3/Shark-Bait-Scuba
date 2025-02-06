import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const diveSites = [
  {
    name: "Blue Lagoon Reef",
    image: "https://images.unsplash.com/photo-1499390155271-23e4667060f5",
    depth: "15-30m",
    level: "Intermediate",
    description: "Crystal clear waters teeming with tropical fish and colorful coral formations."
  },
  {
    name: "Shark Point",
    image: "https://images.unsplash.com/photo-1531803998246-ed33d49b1b76",
    depth: "20-40m",
    level: "Advanced",
    description: "Famous for its regular shark sightings, particularly nurse sharks and reef sharks."
  },
  {
    name: "Turtle Bay",
    image: "https://images.unsplash.com/photo-1523801999971-dbb0cc4f400e",
    depth: "10-25m",
    level: "Beginner",
    description: "Shallow reef system known for its sea turtle population and gentle currents."
  },
  {
    name: "The Wall",
    image: "https://images.unsplash.com/photo-1483707184940-0f9af17b15e7",
    depth: "30-60m",
    level: "Advanced",
    description: "Dramatic wall dive with overhangs, caves, and pelagic fish encounters."
  },
  {
    name: "Coral Gardens",
    image: "https://images.unsplash.com/photo-1506253003752-4a5d1f08eab1",
    depth: "5-15m",
    level: "Beginner",
    description: "Shallow site perfect for beginners, featuring abundant coral life."
  },
  {
    name: "Wreck Alley",
    image: "https://images.unsplash.com/photo-1493225272299-4f6b1d3ff183",
    depth: "25-35m",
    level: "Intermediate",
    description: "Series of purposely sunk vessels creating artificial reefs."
  }
];

export default function DiveSites() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Dive Sites</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully selected dive sites offering unique experiences for divers of all skill levels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diveSites.map((site, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={site.image}
                alt={site.name}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{site.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Depth:</span>
                  <span className="font-medium">{site.depth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                  <span className="font-medium">{site.level}</span>
                </div>
                <p className="text-muted-foreground mt-4">{site.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
