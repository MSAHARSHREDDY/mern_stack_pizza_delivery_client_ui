import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";
import ProductList from "./components/ProductList";
import { SkeletonCard } from "./components/SkeletonCard";

// Accept a single props object instead of destructuring in the async parameter
export default function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const restaurantId = Array.isArray(searchParams?.restaurantId)
    ? searchParams.restaurantId[0]
    : searchParams?.restaurantId;

  // Handle missing restaurantId
  if (!restaurantId) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        No restaurant selected.
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white px-12">
        <div className="container flex items-center justify-between py-24">
          <div>
            <h1 className="text-5xl font-black font-sans leading-tight">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold bg-orange-600">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              src={"/pizza-main.png"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <Suspense fallback={<SkeletonCard />}>
        <ProductList searchParams={{ restaurantId }} />
      </Suspense>
    </>
  );
}
