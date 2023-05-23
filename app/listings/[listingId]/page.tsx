

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";


import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";



interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly >
      {/* <div>
        We have successfully imported the current Listing by its ID.
      </div> */}
      <div className="lg:ml-8">

      <ListingClient
        listing={listing}
          currentUser={currentUser}
          reservations={reservations}
        />
        </div>
    </ClientOnly>
  );
}

export default ListingPage;
