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
    type: "Offshore",
    image: "/images/dive-sites/wrecks/oriskany.jpg"
  },
  {
    name: "Pete Tide II",
    coordinates: [30.1555, -87.2666],
    depth: "60-105ft",
    level: "Intermediate",
    description: `The Pete Tide II is a 180-foot decommissioned oil field supply vessel that was sunk about 12 miles off Pensacola Pass. Sunk in 1993, this wreck has become a thriving marine habitat and a local favorite!

Dive Site Details:
• Depth: The ship sits upright in about 100 feet (30 meters) of water, with the top of the wreck positioned around 60 feet (18 meters) below the surface.
• Experience Level: Divers of varying skill levels can enjoy this site, as it offers accessible areas for newer divers while still providing deeper sections for more advanced exploration.
• Marine Life: Large schools of different types of fish, sharks, and recently a resident goliath grouper are all found on the wreck.
• Conditions: The wreck's upright structure and relatively calm water conditions make for an easy descent and exploration, with generally good visibility. However, beware of rust making visibility difficult at times especially inside the wreck when it has been disturbed.`,
    type: "Offshore"
  },
  // Nearshore Sites
  {
    name: "Perdido Pass Jetties",
    coordinates: [30.2714, -87.5550],
    depth: "15-25ft",
    level: "Beginner",
    description: "Rocky jetties with abundant marine life, perfect for new divers.",
    type: "Shore"
  },
  {
    name: "Destin Jetties",
    coordinates: [30.3931, -86.5137],
    depth: "15-30ft",
    level: "Beginner",
    description: "Popular dive site with easy access and diverse marine life.",
    type: "Shore"
  },
  {
    name: "Fort Pickens – A Unique Gulf Coast Dive Site",
    coordinates: [30.3241, -87.2867],
    depth: "15-50ft",
    level: "Beginner/Intermediate",
    description: `Located within Gulf Islands National Seashore near Pensacola, Florida, Fort Pickens is a historic site offering an exciting shore dive along the Gulf Coast. The area provides a mix of history, marine life, and underwater structures, making it a favorite for local divers.

Diving at Fort Pickens

Depth and Conditions:
• Depths range from 15 to 50 feet, making it suitable for beginner and intermediate divers.
• Visibility varies depending on tides and weather, typically between 10 and 30 feet.
• Best diving conditions occur during slack high tide when water clarity is optimal.

Underwater Features:
• A mix of rock jetties, artificial reef structures, and sandy bottoms provide diverse dive environments.
• The site is known for strong tidal currents, so divers should plan accordingly and be mindful of changing conditions.

Marine Life:
• Divers can encounter octopuses, flounder, sheepshead, redfish, and stingrays among the rocks and reef structures.
• Seasonal appearances of tarpon, barracuda, and sea turtles add to the site's appeal.

Fort Pickens offers a rewarding dive experience for those looking to explore Florida's Gulf Coast waters while enjoying the backdrop of a historic military fort.`,
    type: "Shore"
  },
  {
    name: "Navarre Beach Marine Sanctuary – Artificial Reefs for Easy Shore Diving",
    coordinates: [30.3803, -86.8614],
    depth: "6-15ft",
    level: "Intermediate",
    description: `Located just off Navarre Beach, the Navarre Beach Marine Sanctuary consists of artificial reef structures designed to promote marine life and provide easily accessible shore diving. The sanctuary features multiple reef sites, making it an excellent location for both beginners and experienced divers.

Diving at Navarre Beach Marine Sanctuary

Depth and Conditions:
• Depth ranges from 6 to 15 feet, making it ideal for shallow diving and snorkeling.
• Visibility varies with surf conditions, with the best clarity on calm days.
• Gentle currents allow for relaxed exploration.

Underwater Features:
• The reefs begin approximately 150 feet from shore, with the closest structures reachable by a short surface swim.
• Over 100 artificial reef structures made of limestone and concrete create a thriving ecosystem.
• The reefs are arranged in clusters, providing multiple areas to explore.

Marine Life:
• Frequent sightings of octopuses, crabs, flounder, sheepshead, and spadefish.
• Schools of baitfish attract Spanish mackerel and redfish.
• Seasonal encounters with sea turtles and rays add to the experience.`,
    type: "Shore"
  },
  // Springs
  {
    name: "Vortex Spring – A Premier Freshwater Dive Site in Florida",
    coordinates: [30.7714, -85.9486],
    depth: "20-58ft",
    level: "All Levels",
    description: `Located near Ponce de Leon, Florida, Vortex Spring is one of the most popular freshwater diving destinations in the Southeast. With crystal-clear waters, a constant temperature of 68°F (20°C), and excellent visibility often exceeding 100 feet, it is an ideal site for divers of all levels.

Diving at Vortex Spring:
• Clear, Refreshing Waters: The spring-fed basin provides a pristine underwater environment perfect for both recreational and training dives.
• Depth and Features: The main basin ranges from 20 to 30 feet, making it ideal for beginner divers and training courses. A cavern entrance sits at around 50-60 feet, leading into a restricted cave system. Only properly certified cave divers are allowed beyond the gated entrance.
• Training Features: Training platforms, a sunken boat, and various underwater features make for an engaging dive experience.
• Marine Life: Divers can encounter koi, catfish, eels, turtles, and other aquatic life that have made the spring their home.

For more information, visit their website at <a href="https://vortexspring.com" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">vortexspring.com</a>`,
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
          <Card key={index} id={`dive-site-${index}`} className="backdrop-blur-sm bg-background/30 border shadow-md hover:bg-background/40 transition-colors">
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
              <CardTitle className="text-foreground">{site.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground">Type:</span>
                  <span className="font-medium text-foreground">{site.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Depth:</span>
                  <span className="font-medium text-foreground">{site.depth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Level:</span>
                  <span className="font-medium text-foreground">{site.level}</span>
                </div>
                <div
                  className="text-foreground mt-4 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: site.description }}
                />
                <div className="text-sm text-foreground">
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