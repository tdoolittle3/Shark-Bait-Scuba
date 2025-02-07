import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Shield, Users } from "lucide-react";
import { getImagePath } from "@/lib/utils";

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Shark Bait Scuba</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Based in Pensacola, Florida, Shark Bait Scuba is a private scuba training and guiding service whos mission is to spread get you diving in the Florida Panhandle.
        </p>
        <p className="text-muted-foreground">
          We offer a wide range of training and guiding services for divers of all skill levels. Reach out to us today to make your next scuba adventure a success!
        </p>
      </div>

      {/* Instructor Profile */}
      <Card className="max-w-3xl mx-auto mb-12">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden shrink-0">
              <img
                src={getImagePath('about/IMG_20250128_154008.jpg')}
                alt="Robby Doolittle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Robby Doolittle</h2>
              <p className="text-primary font-medium mb-4">PADI Open Water Scuba Instructor #423428</p>
              <p className="text-muted-foreground mb-6">
                I have been diving since I was a kid in 2009 and now have the opportunity to teach divers here in Pensacola. I have been a PADI Divemaster since 2018 and an instructor since 2024. If I am not diving, I am probably working my "real" job as a paramedic with a local EMS service.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}