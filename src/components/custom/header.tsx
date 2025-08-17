

import { Phone, ShoppingBasket } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const Header = () => {
    return (
        
        <header className="bg-white">
            <nav className="container  px-6 py-5 flex items-center justify-between">


                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-2xl font-bold text-orange-600">
                        🍕 PizzaApp
                    </Link>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>




                <div className="flex items-center gap-x-4">
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
                    {/* <CartCounterWithoutSSR /> */}
                    <div className="relative">
                        <Link href="/cart" >
                            <ShoppingBasket className="hover:text-primary" />
                        </Link>
                        <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                            3
                        </span>

                    </div>
                    <div className="flex items-center ml-12">
                        <Phone />
                        <span>+91 9800 098 998</span>
                    </div>

                    <Button
                        size="sm"
                        asChild
                        className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>


            </nav>
        </header>
    )
}

export default Header

