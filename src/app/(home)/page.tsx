import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductList from './components/ProductList';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: { restaurantId: string } }) {
    return (
        <>
            <section className="bg-white min-h-screen flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Left: Text content */}
                    <div className="text-center md:text-left">
                        <h1 className="text-7xl font-black font-sans leading-tight">
                            Super Delicious Pizza in <br />
                            <span className="text-primary">Only 45 Minutes!</span>
                        </h1>
                        <p className="text-2xl mt-8 max-w-lg leading-snug mx-auto md:mx-0">
                            Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
                        </p>
                        <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
                            Get your pizza now
                        </Button>
                    </div>

                    {/* Right: Image */}
                    <div>
                        <Image alt="pizza-main" src={'/pizza-main.png'} width={400} height={400} />
                    </div>
                </div>
            </section>

            {/* Product list with Suspense */}
            <Suspense fallback={'Loading....'}>
                <ProductList searchParams={searchParams} />
            </Suspense>
        </>
    );
}
