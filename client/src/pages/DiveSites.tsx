import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const diveSites = [
  {
    name: "USS Oriskany",
    coordinates: [30.0587, -87.0059],
    depth: "80-150ft",
    level: "Advanced",
    description: "The world's largest artificial reef, this former aircraft carrier offers an incredible advanced diving experience."
  },
  {
    name: "Pensacola Beach Reef",
    coordinates: [30.3283, -87.1757],
    depth: "15-20ft",
    level: "Beginner",
    description: "A shallow reef system perfect for beginners and snorkelers, featuring various marine life."
  },
  {
    name: "Three Coal Barges",
    coordinates: [30.3007, -87.1401],
    depth: "50-60ft",
    level: "Intermediate",
    description: "Historic coal barge wrecks from the early 1900s, now home to diverse marine life."
  },
  {
    name: "Pete Tide II",
    coordinates: [30.1523, -87.2219],
    depth: "90-100ft",
    level: "Advanced",
    description: "A 165-foot former oilfield supply vessel, offering excellent opportunities for wreck diving."
  }
];

export default function DiveSites() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Northwest Florida Dive Sites</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully selected dive sites in the emerald waters of Northwest Florida.
        </p>
      </div>

      <div className="mb-12 h-[500px] rounded-lg overflow-hidden border">
        <MapContainer
          center={[30.3283, -87.1757]}
          zoom={9}
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
                  <p className="text-sm">Depth: {site.depth}</p>
                  <p className="text-sm">Level: {site.level}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diveSites.map((site, index) => (
          <Card key={index}>
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