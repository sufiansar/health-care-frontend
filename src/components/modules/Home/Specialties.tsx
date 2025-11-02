import { HeartPulse, Brain, Bone, Baby } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const specialists = [
  {
    name: "Cardiology",
    icon: HeartPulse,
    bgColor: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500 dark:text-red-400",
  },
  {
    name: "Neurology",
    icon: Brain,
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Orthopedic",
    icon: Bone,
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-500 dark:text-pink-400",
  },
  {
    name: "Pediatric",
    icon: Baby,
    bgColor: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500 dark:text-green-400",
  },
];

const Specialities = () => {
  return (
    <section className="py-24 mt-24 md:mt-20 bg-background dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground dark:text-gray-100">
              Our Specialist
            </h2>
            <p className="text-muted-foreground dark:text-gray-400 max-w-md mt-2">
              Access to medical experts across all major specialities.
            </p>
          </div>
          <a
            href="#"
            className="text-primary dark:text-blue-400 font-semibold hover:underline mt-4 sm:mt-0"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((specialist) => (
            <Card
              key={specialist.name}
              className={cn(
                "text-center transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground dark:bg-gray-800 dark:text-gray-100"
              )}
            >
              <CardContent className="p-6">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4",
                    specialist.bgColor
                  )}
                >
                  <specialist.icon
                    className={cn(specialist.iconColor)}
                    size={32}
                  />
                </div>
                <h3 className="text-lg font-semibold">{specialist.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialities;
