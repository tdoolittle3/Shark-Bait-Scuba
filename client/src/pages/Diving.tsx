import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Diving() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Diving Services</h1>
        <p className="text-lg text-muted-foreground">
          Experience the best of Northwest Florida's underwater world with our specialized diving services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Discover Local Diving Section */}
        <Card>
          <CardHeader>
            <CardTitle>Discover Local Diving – Explore with a Private Guide!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              New to the area or just want to dive with an experienced local? The PADI Discover Local Diving program is the perfect way to explore the best shore dive sites around Pensacola and the surrounding areas with a private scuba guide.
            </p>
            <p>
              With expert site orientation, safety tips, and local insights, you'll get the most out of your dive while feeling comfortable and confident underwater. No tests, no skills—just great diving!
            </p>
            <p className="font-medium">
              Ready to discover the best dive spots in Northwest Florida? Contact me to book your personalized dive experience today! Every excursion is tailored to what you want to do! Take the work out of diving and let us take care of you!
            </p>
          </CardContent>
        </Card>

        {/* Lionfish Hunting Section */}
        <Card>
          <CardHeader>
            <CardTitle>Lionfish Hunting – Adventure with a Purpose!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Join me for an exciting and rewarding lionfish hunting adventure aboard Niuhi Dive Charters, where you'll not only experience the thrill of the hunt but also help protect our local reefs from this invasive species. Lionfish have no natural predators in the Gulf of Mexico and are rapidly destroying native fish populations, making responsible hunting essential for preserving our underwater ecosystems.
            </p>
            <p>
              With my expertise, I'll teach you how to safely and effectively hunt lionfish, from proper spearfishing techniques to handling these venomous fish. After the dive, I'll also show you how to properly clean your catch, so you can enjoy some of the freshest, most delicious seafood around!
            </p>
            <p className="font-medium">
              Ready to dive, hunt, and make a difference? Book your lionfish hunting trip today! For more information on lionfish conservation efforts, visit the Ocean Strike Team.
            </p>
          </CardContent>
        </Card>

        {/* Spearfishing Section */}
        <Card>
          <CardHeader>
            <CardTitle>Spearfishing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Ready to take the hunt to the next level but unsure where to start? Contact me to discuss details!
            </p>
          </CardContent>
        </Card>

        {/* Divemaster Services Section */}
        <Card>
          <CardHeader>
            <CardTitle>Divemaster Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              In need of a divemaster or want a private divemaster/guide while on board a local charter? Contact me to discuss details!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}