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

    const { reservationId } = params;
    
    
    if (!reservationId || typeof reservationId !== `string`) {
        console.log(reservationId);
        console.log(typeof reservationId);
        
        throw new Error("Invalid Id");
    }



    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            userId: currentUser.id 
        }
    });

    return NextResponse.json(reservation);

}







