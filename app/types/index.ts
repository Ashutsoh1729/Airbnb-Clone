import { Listing, Reservation, User } from "@prisma/client";

//  Here I have forgoten to add the emailVerified to null so it shows error
export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | "emailVerified"
    > & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null,
}
    
export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}


export type SafeReservations = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string,
    startDate: string,
    endDate: string,
    listing: any;
}
