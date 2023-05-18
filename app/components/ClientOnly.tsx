'use client'
import React, { useEffect, useState } from 'react'

// It will check whether we are in server side rendering or not
// We can simply warp the component inside this component which may possible cause hydration error


interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    })

    if (!hasMounted) {
        return null
    }

  return (
      <>
      {children}
      </>
  )
}

export default ClientOnly