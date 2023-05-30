import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
    listingId?: string,
}


export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();


    if (!currentUser) {
        return NextResponse.error();
    }

    let { listingId } = params;

    if (typeof listingId !== `string`) {
        listingId = `${listingId}`
    }

    if (!listingId || typeof listingId !== `string`) {
        throw new Error("Invalid Id");
    }



    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: listingId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);

}







