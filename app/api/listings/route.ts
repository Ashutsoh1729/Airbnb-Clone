import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    req: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    
    const body = await req.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    // Now we are gonna iterate over these objects and check whether any one of them is missing or not

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
        }
    })
     
    
    return NextResponse.json(listing); 


}













