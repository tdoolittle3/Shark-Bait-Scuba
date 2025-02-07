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
    description: "Perfect for first-time divers, this introductory course lets you experience the thrill of breathing underwater in a controlled environment. You'll learn basic safety guidelines and skills needed to dive under the direct supervision of a PADI Professional."
  },
  {
    title: "Open Water Diver",
    description: ""
  },
  {
    title: "Advanced Open Water",
    description: "Take your diving to the next level with specialized training in deep diving, underwater navigation, night diving, and more. This course helps you build confidence and expand your diving capabilities through different adventure dives."
  },
  {
    title: "Rescue Diver",
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

      <div className="max-w-3xl mx-auto space-y-6">
        {courses.map((course, index) => (
          <Card key={index}>
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
  );
}