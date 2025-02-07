import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getImagePath } from "@/lib/utils";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const diveSites = [
  // Springs
  {
    name: "Vortex Springs",
    coordinates: [30.7714, -85.9486],
    depth: "58ft",
    level: "All Levels",
    description: "Crystal clear spring with underwater caves and training platforms. Perfect for training and recreation.",
    type: "Spring",
    image: getImagePath('dive-sites/springs/vortex-spring.jpg')
  },
  {
    name: "Morrison Springs",
    coordinates: [30.6577, -85.9071],
    depth: "45ft",
    level: "All Levels",
    description: "Beautiful spring with three cavern entrances and excellent visibility.",
    type: "Spring"
  },
  // Artificial Reefs and Wrecks
  {
    name: "USS Oriskany",
    coordinates: [30.0587, -87.0059],
    depth: "80-150ft",
    level: "Advanced",
    description: "The world's largest artificial reef, this former aircraft carrier offers an incredible advanced diving experience.",
    type: "Wreck",
    image: getImagePath('dive-sites/wrecks/oriskany.jpg')
  },
  {
    name: "The LuLu",
    coordinates: [30.1429, -87.5551],
    depth: "110ft",
    level: "Advanced",
    description: "271-foot coastal freighter intentionally sunk to create an artificial reef.",
    type: "Wreck"
  },
  {
    name: "The New Venture",
    coordinates: [30.0924, -87.2198],
    depth: "78ft",
    level: "Intermediate",
    description: "Former fishing vessel now serving as an artificial reef.",
    type: "Wreck"
  },
  {
    name: "The Ocean Wind",
    coordinates: [30.1246, -87.1834],
    depth: "85ft",
    level: "Intermediate",
    description: "Sunken freighter with abundant marine life.",
    type: "Wreck"
  },
  {
    name: "The Antares",
    coordinates: [30.1308, -87.2547],
    depth: "80ft",
    level: "Intermediate",
    description: "Former coal freighter creating a thriving artificial reef.",
    type: "Wreck"
  },
  {
    name: "The Avocet",
    coordinates: [30.0982, -87.1659],
    depth: "90ft",
    level: "Advanced",
    description: "Tugboat wreck with interesting structure and marine life.",
    type: "Wreck"
  },
  {
    name: "Russian Freighter",
    coordinates: [30.1167, -87.2333],
    depth: "95ft",
    level: "Advanced",
    description: "Large cargo vessel with extensive marine growth.",
    type: "Wreck"
  },
  // Nearshore Sites
  {
    name: "Perdido Pass Jetties",
    coordinates: [30.2714, -87.5550],
    depth: "15-25ft",
    level: "Beginner",
    description: "Rocky jetties with abundant marine life, perfect for new divers.",
    type: "Reef"
  },
  {
    name: "Destin Jetties",
    coordinates: [30.3931, -86.5137],
    depth: "15-30ft",
    level: "Beginner",
    description: "Popular dive site with easy access and diverse marine life.",
    type: "Reef"
  },
  {
    name: "Fort Pickens",
    coordinates: [30.3241, -87.2867],
    depth: "15-25ft",
    level: "Beginner",
    description: "Historic site with jetties and artificial reefs.",
    type: "Reef"
  },
  {
    name: "Navarre Marine Park",
    coordinates: [30.3803, -86.8614],
    depth: "40-60ft",
    level: "Intermediate",
    description: "Series of artificial reefs creating a diverse ecosystem.",
    type: "Reef"
  }
];

export default function DiveSites() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Northwest Florida Dive Sites</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully selected dive sites in the emerald waters of Northwest Florida, from springs to wrecks and reefs.
        </p>
      </div>

      <div className="mb-12 h-[500px] rounded-lg overflow-hidden border">
        <MapContainer
          center={[30.2714, -87.2550]} // Centered on Pensacola area
          zoom={8}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {diveSites.map((site, index) => (
            <Marker key={index} position={site.coordinates}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{site.name}</h3>
                  <p className="text-sm">Type: {site.type}</p>
                  <p className="text-sm">Depth: {site.depth}</p>
                  <p className="text-sm">Level: {site.level}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diveSites.map((site, index) => (
          <Card key={index}>
            {site.image && (
              <div className="aspect-video relative">
                <img
                  src={site.image}
                  alt={site.name}
                  className="absolute inset-0 object-cover w-full h-full rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{site.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{site.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Depth:</span>
                  <span className="font-medium">{site.depth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                  <span className="font-medium">{site.level}</span>
                </div>
                <p className="text-muted-foreground mt-4">{site.description}</p>
                <div className="text-sm text-muted-foreground">
                  Coordinates: {site.coordinates[0].toFixed(4)}°N, {site.coordinates[1].toFixed(4)}°W
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}