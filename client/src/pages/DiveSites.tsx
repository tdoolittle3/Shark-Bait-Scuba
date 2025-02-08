import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getImagePath } from "@/lib/utils";
import { useEffect } from "react";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// This component will handle map invalidation
function MapInvalidator() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);

  return null;
}

const diveSites = [
  // Wrecks
  {
    name: "USS Oriskany – The World's Largest Artificial Reef",
    coordinates: [30.0587, -87.0059],
    depth: "84-212ft",
    level: "Advanced/Technical",
    description: `The USS Oriskany, also known as the "Mighty O" or the "Great Carrier Reef," is an Essex-class aircraft carrier intentionally sunk in 2006 to create an artificial reef. Located 22 miles southeast of Pensacola, Florida, it is the largest vessel ever intentionally scuttled for diving purposes.

Dive Site Overview:
• Depth: The wreck sits at 212 feet (65 meters), with the tower starting at 84 feet (26 meters) and the flight deck at 145 feet (44 meters).
• Skill Level: Due to its depth and potential for strong currents, this site is recommended for advanced and technical divers.
• Marine Life: Over the years, the wreck has become home to a wide variety of marine species, including grouper, amberjack, barracuda, snapper, and sharks.
• Conditions: Visibility is typically good, but currents can be strong, requiring careful dive planning.

Today, the Oriskany serves as a thriving underwater ecosystem, attracting divers from around the world. Its sheer size and depth provide an impressive and challenging wreck diving experience, making it one of the most iconic dive sites in the Gulf of Mexico.`,
    type: "Wreck",
    image: "/images/dive-sites/wrecks/oriskany.jpg"
  },
  {
    name: "Pete Tide II",
    coordinates: [30.1555, -87.2666],
    depth: "60-105ft",
    level: "Intermediate",
    description: `The Pete Tide II is a 180-foot decommissioned oil field supply vessel that was sunk about 12 miles off Pensacola Pass. Sunk in 1993, this wreck has become a thriving marine habitat and a local favorite!

Dive Site Details:
• Depth: The ship sits upright in 100-105 feet (30-32 meters) of water, with the pilot house positioned around 60 feet (18 meters) below the surface.
• Experience Level: Divers of varying skill levels can enjoy this site, as it offers accessible areas for newer divers while still providing deeper sections for more advanced exploration.
• Marine Life: Large schools of different types of fish, sharks, and recently a resident goliath grouper are all found on the wreck.
• Conditions: The wreck's upright structure and relatively calm water conditions make for an easy descent and exploration, with generally good visibility. Beware of rust making visibility difficult at times especially inside the wreck when it has been disturbed.`,
    type: "Wreck"
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
  },
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
  }
];

function scrollToCard(siteId: string) {
  const element = document.getElementById(siteId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

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
          <MapInvalidator />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {diveSites.map((site, index) => (
            <Marker
              key={index}
              position={[site.coordinates[0], site.coordinates[1]] as [number, number]}
            >
              <Popup>
                <div className="p-2">
                  <h3
                    onClick={() => scrollToCard(`dive-site-${index}`)}
                    className="font-bold text-primary hover:underline cursor-pointer"
                  >
                    {site.name}
                  </h3>
                  <p className="text-sm">Type: {site.type}</p>
                  <p className="text-sm">Depth: {site.depth}</p>
                  <p className="text-sm">Level: {site.level}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
        {diveSites.map((site, index) => (
          <Card key={index} id={`dive-site-${index}`}>
            {site.image && (
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={site.image}
                  alt={site.name}
                  className="absolute inset-0 object-cover w-full h-full rounded-t-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    console.error(`Failed to load image for ${site.name}`);
                  }}
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
                <p className="text-muted-foreground mt-4 whitespace-pre-line">{site.description}</p>
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