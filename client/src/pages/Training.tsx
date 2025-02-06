import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const courses = [
  {
    title: "Discover Scuba",
    image: "https://images.unsplash.com/photo-1470753323753-3f8091bb0232",
    description: "Perfect for first-time divers, this introductory course lets you experience the thrill of breathing underwater in a controlled environment. You'll learn basic safety guidelines and skills needed to dive under the direct supervision of a PADI Professional."
  },
  {
    title: "Open Water Certification",
    image: "https://images.unsplash.com/photo-1516481265257-97e5f4bc50d5",
    description: "The first step in becoming a certified diver. This comprehensive course covers essential diving theory, confined water skills practice, and open water dives. Upon completion, you'll be certified to dive independently with a buddy to a maximum depth of 18 meters."
  },
  {
    title: "Advanced Open Water",
    image: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e",
    description: "Take your diving to the next level with specialized training in deep diving, underwater navigation, night diving, and more. This course helps you build confidence and expand your diving capabilities through different adventure dives."
  },
  {
    title: "Rescue Diver",
    image: "https://images.unsplash.com/photo-1540206235220-7590996b7a5a",
    description: "Learn to prevent and manage dive emergencies, minor and major diving problems, and rescue procedures. This challenging and rewarding course will make you a better buddy and prepare you for diving leadership roles."
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

      <div className="overflow-x-auto pb-6">
        <div className="flex gap-6 min-w-max">
          {courses.map((course, index) => (
            <Card key={index} className="w-[400px] flex-shrink-0">
              <div className="aspect-video relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {course.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}