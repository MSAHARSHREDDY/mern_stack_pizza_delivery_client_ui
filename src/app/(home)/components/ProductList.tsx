
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from '@/lib/types';
import ProductCard from './ProductCard';

const ProductList = async({searchParams}:{searchParams:{restaurantId:string}}) => {
  console.log("searchParam",searchParams.restaurantId)
    
      {/*******Fetching categories from backendEnd **********************/ }
      const catgeoryResponse = await fetch(`${process.env.BACKEND_URL_FETCH_CATEGORIES}`, {
        next: {
          revalidate: 0//0 second It is used for caching the data make sure be aware of this. And fetches new data for every 0 second from backend when u update the data it fetches in 0 second.
        }
      })
      if (!catgeoryResponse.ok) {
        throw new Error("Failed to fetch categories")
      }
      const categories: Category[] = await catgeoryResponse.json()
      console.log("categories", categories)
    
      {/******Fetching products from backend*************************** */ }
      const productResponse = await fetch(`${process.env.BACKEND_URL_FETCH_PRODUCTS}?perPage=100&tenantId=${searchParams.restaurantId}`, {
        
      })
      if (!productResponse.ok) {
        throw new Error("Failed to fetch products")
      }
      //If you are having pagination we get "data" as name so need to add "data" on i.e data:Product[]
      const products: { data: Product[] } = await productResponse.json()
      console.log("products", products)
  return (
 
      <section>
        <div className="container  px-12 py-12">
          <Tabs defaultValue={categories[0]._id}>
            <TabsList>
              {
                categories.map((category) => (
                  <TabsTrigger value={category._id} className="text-md" key={category._id}>{category.name}</TabsTrigger>
                ))
              }
            </TabsList>

            {
              categories.map((category) => (
                <TabsContent key={category._id} value={category._id}>
                  <div className="grid grid-cols-4 gap-6 mt-6">
                    {/**Calling to the ProductCard */}
                    {
                      products.data.filter((product)=>product.category._id===category._id).map((product) => (
                        //Rendering Product card
                        //Left side product is the name of the prop and right side product is our actual value we are passing in
                        <ProductCard product={product} key={product._id} />
                      ))
                    }
                  </div>

                </TabsContent>
              ))
            }

            <TabsContent value="beverages">Change your Beverages here.</TabsContent>
          </Tabs>
        </div>
      </section>
  )
}

export default ProductList
