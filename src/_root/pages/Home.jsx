import React from "react";
import Button from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";

const Home = () => {
  const toast = useToast();

  return (
    <div className="p-10">
      <Button
        onClick={() =>
          toast({
            title: "Hello World!",
            description:
              "This is a test toast. I am typing random bullshit just so i can see the sctual working of this bullshit app that's makign me insane",
          })
        }
      >
        Click me!
      </Button>
    </div>
  );
};

export default Home;
