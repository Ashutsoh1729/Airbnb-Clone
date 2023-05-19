import { User } from "@prisma/client";

//  Here I have forgoten to add the emailVerified to null so it shows error
export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | "emailVerified"
    > & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null,
}
    
