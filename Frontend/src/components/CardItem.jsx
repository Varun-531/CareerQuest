import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CardItem = () => {
  return (
    <div>
      <Card className="md:w-[40vw] lg:w-[25vw] w-[70vw] h-fit group hover:scale-105 mt-10 dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Explore New Horizons</CardTitle>
          <CardDescription>Unlock the potential within you</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9} className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGpvYnN8ZW58MHx8MHx8fDA%3D"
              alt="Image"
              className="rounded-md object-cover lg:w-[20vw] flex group-hover:scale-105"
            />
          </AspectRatio>
        </CardContent>
        <CardFooter>
          <p>
            Join our community and start your journey today. Visit our website
            for more information.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardItem;
