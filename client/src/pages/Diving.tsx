import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
        {/* Private Guiding Section */}
        <Card>
          <CardHeader>
            <CardTitle>Private Guiding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our private guiding service offers a personalized diving experience tailored to your interests and skill level. Whether you're new to the area or looking to explore specific dive sites, our experienced guides will ensure a safe and memorable dive.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">What We Offer:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Customized dive plans based on your experience and interests</li>
                <li>Local knowledge of the best dive sites and conditions</li>
                <li>Flexible scheduling to accommodate your availability</li>
                <li>Small groups or one-on-one guidance</li>
                <li>Equipment advice and assistance if needed</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Lionfish Hunting Section */}
        <Card>
          <CardHeader>
            <CardTitle>Lionfish Hunting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Join us in helping to control the invasive lionfish population while learning safe and effective hunting techniques. Lionfish hunting combines conservation with an exciting underwater challenge.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Program Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Safety briefing and lionfish handling instruction</li>
                <li>Training in proper hunting techniques and equipment use</li>
                <li>Information about lionfish impact on local ecosystems</li>
                <li>Tips for safe capture and handling</li>
                <li>Optional cooking and preparation guidance</li>
              </ul>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>Note:</strong> Special certification or experience may be required. Contact us for details.
            </div>
          </CardContent>
        </Card>

        {/* Spearfishing Section */}
        <Card>
          <CardHeader>
            <CardTitle>Spearfishing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Experience the ancient art of spearfishing in the rich waters of the Gulf Coast. Our guided spearfishing trips combine traditional techniques with modern equipment for an unforgettable underwater hunting experience.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">What to Expect:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Comprehensive safety and technique briefing</li>
                <li>Equipment guidance and recommendations</li>
                <li>Local regulations and sustainable fishing practices</li>
                <li>Guidance on fish identification and selection</li>
                <li>Tips for improving accuracy and hunting success</li>
              </ul>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>Requirements:</strong> Basic diving certification required. Advanced certification recommended.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
