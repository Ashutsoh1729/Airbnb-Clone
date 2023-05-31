import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
    reservationId?: string,
}


export async function DELETE(
    request: Request,
    {params}: { params: IParams}
) {
    const currentUser = await getCurrentUser();


    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationsId }:any =  params;
    
    
    if (!reservationsId || typeof reservationsId !== `string`) {
        throw new Error("Invalid Id");
    }



    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationsId,
            userId: currentUser.id 
        }
    });

    return NextResponse.json(reservation);

}







