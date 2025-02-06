import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Discover Scuba",
    image: "https://images.unsplash.com/photo-1470753323753-3f8091bb0232",
    description: "First-time experience for those curious about scuba diving",
    duration: "1 day",
    price: "$199"
  },
  {
    title: "Open Water Certification",
    image: "https://images.unsplash.com/photo-1516481265257-97e5f4bc50d5",
    description: "Complete certification course for beginners",
    duration: "4-5 days",
    price: "$499"
  },
  {
    title: "Advanced Open Water",
    image: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e",
    description: "Enhance your skills with specialized dive training",
    duration: "2-3 days",
    price: "$399"
  },
  {
    title: "Rescue Diver",
    image: "https://images.unsplash.com/photo-1540206235220-7590996b7a5a",
    description: "Learn to prevent and manage dive emergencies",
    duration: "4 days",
    price: "$599"
  }
];

export default function Training() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Training Courses</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From beginners to advanced divers, our professional instructors will guide you through your scuba journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <Card key={index} className="flex flex-col">
            <div className="aspect-video relative">
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-bold">{course.price}</span>
                </div>
              </div>
              <Button className="w-full mt-6">Enroll Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
