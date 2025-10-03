

import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tenant } from "@/lib/types"

import CartCounterWithoutSSR from "./CartCounterWithoutSSR"
import TenantSelect from "./TenantSelect"
import { getSession } from "@/lib/session"
import Logout from "./Logout"


const Header = async() => {
    const session=await getSession()//This session helps you to get complete user information once user has logged in
    console.log("session",session)
    {/**Fetching tenant/restarant from backendEnd */}
    const tenantsResponse=await fetch(`${process.env.BACKEND_URL}/api/auth/tenants?perPage=100`,{
        next:{
            revalidate: 0//0 second It is used for caching the data make sure be aware of this. And fetches new data for every 0 second from backend when u update the data it fetches in 0 second.
        }
    })
    if(!tenantsResponse.ok){
        throw new Error("Failed to fetch tenants")
    }
    //If you are having pagination we get "data" as name so need to add "data" on i.e  data:Tenant[]
    const restaurants:{data:Tenant[]}=await tenantsResponse.json()
    console.log("restaurants",restaurants)
    return (
        
        <header className="bg-white">
            <nav className="container  px-6 py-5 flex items-center justify-between">
          


                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-2xl font-bold text-orange-600">
                        🍕 PizzaApp
                    </Link>
                    {/**Rendering the list of restaurants */}
                   <TenantSelect restaurants={restaurants}/>
                </div>




                <div className="flex items-center gap-x-6">
                    <ul className="flex items-center font-medium space-x-4">
                        <li>
                            <Link className="hover:text-primary" href={'/'}>
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-primary" href={'/orders'}>
                                Orders
                            </Link>
                        </li>
                    </ul>
                     {/**Rendering cart component 
                     * Here "store" only works for client side so for that we have to use "use client" in cartCounter component 
                    */}
                    { <CartCounterWithoutSSR /> }
                   
                  
                   

                    {
                        session? 
                        <Logout/>//onClick cannot be kept under server component for that we have created a seperate component and kept as "use client"
                    :
                        <Button
                        size="sm"
                        asChild
                        className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Link href="/login">Login</Link>
                    </Button>
                    }

                   
                </div>


            </nav>
        </header>
    )
}

export default Header

