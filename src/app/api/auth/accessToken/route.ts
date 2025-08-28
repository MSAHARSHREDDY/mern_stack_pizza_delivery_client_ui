import {cookies} from "next/headers"


export async function GET(){
    const cookieStore=await cookies()
    console.log("cookie store",cookieStore)
    return Response.json({token:cookieStore.get("accessToken")?.value})
}