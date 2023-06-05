'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'


interface UserMenuProps {
  currentUser?: SafeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  // Lets add some state to the components
  const [isOpen, setIsOpen] = useState(false);

  // Another function which will be a callback function
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen])

  const modalRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) && menuButtonRef?.current &&
        !event.composedPath().includes(menuButtonRef?.current as EventTarget)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);




  // Adding functionalities for giving rent 
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open the rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal])


  return (
    <div className=' relative'>
      <div className='flex flex-row items-center gap-3 pr-3'>
        <div
          onClick={onRent}
          className=' 
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    px-4
                    py-3
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    '
        >
          {currentUser ? `Welcome ${currentUser.name}` : "Airbnb Your Home"}
        </div>
        <div
          ref={modalRef}
          onClick={toggleOpen}
          className='
                    p-4
                    flex
                    flex-row
                    border-[1px]
                    items-center
                    rounded-full
                    cursor-pointer
                    gap-3
                    hover:shadow-md
                    transition
                    md:px-2
                    md:py-1
                    border-neutral-200
                  '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>

        </div>
      </div>
      {isOpen && (
        <div
          className='
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-3/4
          bg-white
          overflow-hidden
          right-0
          top-12
          text-sm
        '
        >
          <div className=' flex flex-col cursor-pointer' ref = {menuButtonRef}>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label='My Trips'
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label='My Favorites'
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label='My Reservations'
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label='My Properties'
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label='Airbnb My Home'
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label='Logout'
                />
              </>

            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label='Login'
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label='SignUp'
                />
              </>)}

          </div>

        </div>
      )}
    </div>
  )
}

export default UserMenu