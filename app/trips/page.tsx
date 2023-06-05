


import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import TripsClient from './TripsClient';

const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    const currentUserId = currentUser.id;

    if (currentUserId == null) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ userId: currentUserId });

    
    
    // reservations.map((reservation: any) => {

    //     let id = reservation.id;
    //     let listing = reservation.listing;
   
        
    //     });
    
    



  return (
      <ClientOnly>
          <TripsClient
              reservations={reservations}
              currentUser={currentUser}
          />
        </ClientOnly>
  )
}

export default TripsPage