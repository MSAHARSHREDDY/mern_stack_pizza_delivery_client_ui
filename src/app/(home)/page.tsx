import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import { Suspense } from "react";
import ProductCard, { Product } from "./components/ProductCard";

const products:Product[]=[
{
  id:"1",
  name:"Margintenia pizza",
  description:"This is very tasty pizza",
  image:"/pizza-main.png",
  price:500
},
{
  id:"2",
  name:"Margintenia pizza",
  description:"This is very tasty pizza",
  image:"/pizza-main.png",
  price:500
},
{
  id:"3",
  name:"Margintenia pizza",
  description:"This is very tasty pizza",
  image:"/pizza-main.png",
  price:500
},
{
  id:"4",
  name:"Margintenia pizza",
  description:"This is very tasty pizza",
  image:"/pizza-main.png",
  price:500
},
{
  id:"5",
  name:"Margintenia pizza",
  description:"This is very tasty pizza",
  image:"/pizza-main.png",
  price:500
}
]

export default function Home() {
  return (
    <>
    {/**This is for the main hero section */}
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
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold bg-orange-600 ">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image alt="pizza-main" src={'/pizza-main.png'} width={400} height={400} />
          </div>
        </div>
      </section>

    {/**Ths is for tab section */}
      <section>
        <div  className="container  px-12 py-12">
          <Tabs defaultValue="pizza">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md">Pizza</TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
             <div className="grid grid-cols-4 gap-6 mt-6">
              {/**Calling to the ProductCard */}
               {
                products.map((product)=>(
                  //Left side product is the name of the prop and right side product is our actual value we are passing in
                  <ProductCard product={product} key={product.id}/>
                ))
              }
             </div>
              
            </TabsContent>
            <TabsContent value="beverages">Change your Beverages here.</TabsContent>
          </Tabs>
        </div>
      </section>


      {/* todo: add skeleton component */}
      <Suspense fallback={'Loading....'}>

      </Suspense>
    </>
  );
}
