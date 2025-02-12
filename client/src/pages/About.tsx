import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Shield, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Shark Bait Scuba</h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Based in Pensacola, Florida, Shark Bait Scuba is a private scuba training and guiding service whos mission is to spread get you diving in the Florida Panhandle.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a wide range of training and guiding services for divers of all skill levels. Reach out to us today to make your next scuba adventure a success!
          </p>
        </div>

        {/* Instructor Profile */}
        <Card className="max-w-3xl mx-auto mb-12">
          <CardContent className="pt-6 space-y-8">
            {/* First Section - Profile Picture and First Paragraph */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-64 h-80 overflow-hidden shrink-0 mx-auto md:mx-0">
                <img
                  src="/images/about/robbydoolittleinstructorpic.jpg"
                  alt="Robby Doolittle"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Robby Doolittle</h2>
                <p className="text-primary font-medium mb-4">PADI Open Water Scuba Instructor #423428</p>
                <p className="text-muted-foreground">
                  I have been diving since I was a kid in 2009 and now have the opportunity to teach divers here in Pensacola. I have been a PADI Divemaster since 2018 and an instructor since 2024. In addition to teaching, I work as a divemaster for Niuhi Dive Charters. If I am not diving, I am probably working my "real" job as a paramedic with a local EMS service.
                </p>
              </div>
            </div>

            {/* Second Section - Second Paragraph and Additional Image */}
            <div className="flex flex-col-reverse md:flex-row items-start gap-8">
              <div className="text-center md:text-left md:flex-1">
                <p className="text-muted-foreground">
                  When I was five years old, I was attacked by a shark in Corpus Christi, Texas and almost lost my leg. This is where the name "Shark Bait" comes from. No one should be afraid of the water even though things sometimes happen. Nothing is as cool as going underwater and getting to see sharks in their natural habitat.
                </p>
              </div>
              <div className="w-full md:w-72 shrink-0">
                <img
                  src="/images/about/markup_1000000453.jpg"
                  alt="Additional diving photo"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}