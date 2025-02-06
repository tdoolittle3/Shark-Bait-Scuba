import { Card, CardContent } from "@/components/ui/card";

const team = [
  {
    name: "Mike Johnson",
    role: "Lead Instructor",
    image: "https://images.unsplash.com/photo-1516880711640-ef7db81be3e1",
    description: "PADI Course Director with over 15 years of experience"
  },
  {
    name: "Sarah Chen",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1521830101529-057b1dfd9784",
    description: "Ensuring smooth operations and exceptional customer service"
  },
  {
    name: "David Torres",
    role: "Equipment Specialist",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31",
    description: "Expert in gear maintenance and equipment safety"
  }
];

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Shark Bait Scuba</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Since 2010, we've been helping divers of all levels explore the underwater world safely and confidently.
        </p>
        <p className="text-muted-foreground">
          Our mission is to provide exceptional scuba diving experiences through professional instruction, quality equipment, and unforgettable adventures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {team.map((member, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{member.name}</h3>
              <p className="text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Our Certifications</h2>
        <p className="text-muted-foreground">
          We're proud to be a PADI 5-Star Dive Center, meeting the highest standards in the diving industry. All our instructors are PADI certified with extensive experience in dive education and safety.
        </p>
      </div>
    </div>
  );
}
