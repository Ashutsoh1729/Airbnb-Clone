import prisma from "../libs/prismadb"
import getCurrentUser from "./getCurrentUser"


export default async function getFavoriteListings() {
    
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return [];
    }

    const favorites = await prisma.listing.findMany({
        where: {
            id: {
                in: [...(currentUser.favoriteIds || [])]
            }
        }
    })

    // console.log(favorites);
    

    const safeFavorites = favorites.map((favorite) => (
        {
            ...favorites,
            createdAt: favorite.createdAt.toISOString()
        }
    ))

    return safeFavorites;


}