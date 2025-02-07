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
    description: (
      <>
        <p className="mb-4">
          The PADI Open Water Diver Course is your gateway to the underwater world! This globally recognized certification allows you to dive independently with a buddy to a maximum depth of 60 feet (18 meters).
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">What You'll Learn:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Knowledge Development – Learn diving principles, safety procedures, and equipment usage through self-study or instructor-led sessions.</li>
              <li>Confined Water Training – Practice essential dive skills in a pool or pool-like environment to build confidence and control underwater.</li>
              <li>Open Water Dives – Apply what you've learned in four open water dives under instructor supervision.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Course Requirements:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Minimum Age: 10 years old (Junior Open Water Diver for ages 10-14)</li>
              <li>Swimming Skills: Must be able to swim 200 meters (or 300 meters with mask, snorkel, and fins) and float/tread water for 10 minutes.</li>
              <li>Health & Safety: Complete a medical questionnaire; clearance from a physician may be required.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Why Take This Course?</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gain the freedom to explore the ocean with a dive buddy.</li>
              <li>Join a worldwide community of certified divers.</li>
              <li>Open the door to advanced diving adventures like wreck diving, night diving, and underwater photography!</li>
            </ul>
          </div>
        </div>

        <p className="mt-4 font-medium">
          Ready to start your diving journey? Contact me for more details or to schedule your course.
        </p>
      </>
    )
  },
  {
    title: "Advanced Open Water",
    description: (
      <>
        <p className="mb-4">
          Take your diving skills to the next level with the PADI Advanced Open Water Diver Course! This course builds on your existing knowledge and experience, introducing you to new types of diving while increasing your confidence and abilities underwater.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">What You'll Learn:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Five Adventure Dives – Two core dives (Deep & Underwater Navigation) plus three additional adventure dives of your choice, such as:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Wreck Diving</li>
                  <li>Night Diving</li>
                  <li>Peak Performance Buoyancy</li>
                  <li>Drift Diving</li>
                  <li>Search & Recovery, and more!</li>
                </ul>
              </li>
              <li>Deep Diving – Learn how to safely explore depths up to 100 feet (30 meters).</li>
              <li>Navigation Skills – Improve your underwater navigation using a compass and natural references.</li>
              <li>Specialty Diving Techniques – Experience different types of diving to discover what excites you most!</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Course Requirements:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Minimum Age: 12 years old (Junior Advanced Open Water for ages 12-14)</li>
              <li>Prerequisite: PADI Open Water Diver certification</li>
              <li>Health & Safety: Complete a medical questionnaire; clearance from a physician may be required.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Why Take This Course?</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Expand your diving experience and boost your confidence in new environments.</li>
              <li>Gain deeper depth certification, allowing you to explore more dive sites.</li>
              <li>Work toward specialty certifications and future pro-level training.</li>
            </ul>
          </div>
        </div>

        <p className="mt-4 font-medium">
          Ready to level up your dive skills? Sign up today and start exploring the underwater world in new ways! Contact me for details or to schedule your course.
        </p>
      </>
    )
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
              <CardDescription className="whitespace-pre-wrap text-sm text-muted-foreground">
                {course.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}