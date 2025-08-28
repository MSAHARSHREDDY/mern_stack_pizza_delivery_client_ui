// app/checkout/page.tsx
import { getSession } from '@/lib/session';
import CustomerForm from './components/CustomerForm';
import { redirect } from 'next/navigation';

//"searchParams" in server side is a default prop provided by Next.js only in the App Router
export default async function Checkout({searchParams}: {
  searchParams: { restaurantId: string }
}) {
  const restaurantId = searchParams.restaurantId; // ✅ correct usage

  console.log("restaurantId-search-param", restaurantId); // Works fine now
  const session = await getSession();
 
   /*Think of query parameters in a URL — they always work as key=value pairs.
  restaurantId → key
1 → value*/
  const queryParams =new URLSearchParams({restaurantId})
 console.log("queryParams",queryParams)//here you get restaurantId=1
 const existingQueryString=queryParams.toString()
 console.log("existingQueryString",existingQueryString)
 queryParams.append('return-to', `/checkout?${existingQueryString}`);
  


  //checking if user is logged or not,if not redirect to login page
  if (!session) {
    redirect(`/login?${queryParams}`);
  }

  return <CustomerForm />;
}
