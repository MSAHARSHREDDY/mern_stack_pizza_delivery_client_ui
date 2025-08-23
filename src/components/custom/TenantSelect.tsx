"use client"
//Making this client component
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tenant } from '@/lib/types'
import { useRouter, useSearchParams } from 'next/navigation'

const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
    const router=useRouter()
    const searchParams=useSearchParams()
    console.log("searchParams",searchParams.get("restaurantId"))
    const handleValueChange=(value:string)=>{
        console.log("handleValueChange",value)
        router.push(`/?restaurantId=${value}`)
    }
    return (
        <div>
            <Select onValueChange={handleValueChange} defaultValue={searchParams.get("restaurantId") || ""}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Restaurant" />
                </SelectTrigger>
                <SelectContent>
                    {
                        restaurants.data.map((restaturant) => (
                            <SelectItem key={restaturant.id} value={String(restaturant.id)}>
                                {restaturant.name}
                                </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default TenantSelect
