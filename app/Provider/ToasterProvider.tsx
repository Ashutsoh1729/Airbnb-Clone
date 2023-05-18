'use client';

// It uses useEffect inside it and according to the new app directory 
// we can't just use them like that 
// We have to warp up them inside a client component in order to use them.


import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster />
    )
}

export default ToasterProvider;

