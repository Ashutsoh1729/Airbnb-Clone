'use client'

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'


interface UserMenuProps{
  currentUser?: SafeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // Lets add some state to the components
  const [isOpen, setIsOpen] = useState(false);

  // Another function which will be a callback function
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  },[isOpen])


  return (
      <div className=' relative'>
          <div className='flex flex-row items-center gap-3 pr-3'>
              <div
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
                  onClick={() => { }}
              >
                  {currentUser? `Welcome ${currentUser.name}`:"Airbnb Your Home"}
              </div>
              <div
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
            <Avatar src={currentUser?.image } />
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
          <div className=' flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
              <MenuItem
                onClick={()=>{}}
                label='My Profile'
              />
               <MenuItem
                onClick={() => { }}
                label='My Trips'
              />
               <MenuItem
                onClick={() => { }}
                label='My Favorites'
              />
               <MenuItem
                onClick={() => { }}
                label='My Reservations'
              />
               <MenuItem
                onClick={() => { }}
                label='My Properties'
              />
               <MenuItem
                onClick={() => { }}
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