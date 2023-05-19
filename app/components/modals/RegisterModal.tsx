'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"


import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../input/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';



const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    // We have established our form control with this function

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });




    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        try{setIsLoading(true);

        // Here we are going to initiate a axios post call to the register endpoint  
        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something wrong in Resister Modal.")
            })
            .finally(() => {
                setIsLoading(false);
            })
                ;
        } catch (error){
                console.log(error);
            }
    }


    const onToggle = () => {
        setIsLoading(false);
        loginModal.onOpen();
        registerModal.onClose();
    }


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to Airbnb'
                subtitle='Create an Account'
                center
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                // type={''}
                
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                // type={''}
                
            />
            <Input
                id='password'
                label='Password '
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type='password'
                
            />
        </div>
    )


    const footerContent = (
        <div className='flex flex-col gap-3 mt-4'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>signIn("google")}
            />
            <Button
                outline
                label='Continue with GitHub'
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div
              className='
                text-neutral-500
                text-center
                mt-4
                font-light
            '
            >
                <div className='flex flex-row gap-2 items-center justify-center '>
                    <div>
                        Already have an Account? 
                    </div>
                    <div onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline text-center'>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )



  return (
      <Modal
          disabled={isLoading}
          isOpen={registerModal.isOpen}
          title='Register'
          actionLabel='Continue'
          onClose={registerModal.onClose}
          onSubmit={ handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
      />
  )
}

export default RegisterModal



