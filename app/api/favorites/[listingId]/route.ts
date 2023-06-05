import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '../../../libs/prismadb'


interface IParms{
    listingId?:string,
}

export async function POST( { params }: {params : IParms}) {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return NextResponse.error();
    }
    
    const { listingId } = params;
    
    if (!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id, location: api/favorite//route.ts")
    }
    
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    
    favoriteIds.push(listingId);
    
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds,
        }
    })
    
    return NextResponse.json(user);
}

// Here we can create a delete function 

export async function DELETE(res: Response, { params }: { params: IParms }) {
    
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    
    if (!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id, location: api/favorite//route.ts")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id)=>id!==listingId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds,
        }
    });

    return NextResponse.json(user);


}











