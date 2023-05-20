'use client'
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../input/CategoryInput'
import { FieldValues, useForm } from 'react-hook-form'
import CountrySelect from '../input/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../input/Counter'
// import Map from '../Map'


// As we are going to add some steps in the process in renting lets create an enum

enum STEPS {
    CATAGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();

    // Now lets add the control for the steps 
    const [step, setStep] = useState(STEPS.CATAGORY);


    // Now lets create a form 
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch("category"); // Now we have to create a custom setValues
    const location = watch("location"); // Now we have to create a custom setValues
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location]);



    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch:true
        })
    }



    // Now create the functions to go forward and backward
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }


    // Now a new hook we are going to use, that is useMemo

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return  'Create '
        }
        return "Next"
    }, [step])
    
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATAGORY) {
            return undefined
        }
        return 'Back '
    },[step])

    // Now create our body content
    // Here we want our body content to be dynamic depending on the steps we are on
    // So insted of cosnt body content we will use let as body content
    
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Which of these best describes your place?'
                subtitle='Pick a category '
            />
            <div
                className=' 
                grid 
                grid-cols-1 
                md:grid-cols-2 
                gap-3 
                max-h-[50vh] 
                overflow-y-auto
            '>
                {/* Inside the div we are going to map our categories */}

                {categories.map((item) => (
                    <div key={item.label} className='grid-cols-1'>
                        {/* Listen the video again and add the comment why we add this component here */}
                        <CategoryInput
                            onClick={(category) => setCustomValue("category",category)}
                            selected={category == item.label}
                            label={item.label}
                            icon = {item.icon }
                        />
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    )

    if (step == STEPS.LOCATION) {
        bodyContent = (
            <div className=' flex flex-col gap-4'>
                {/* location step!   */}
                <Heading
                    title={'Where is your Place located?'}
                    subtitle='Help guests to find you!'
                />

                {/* Here we create a input section for the location purpose */}
                <CountrySelect
                    value={location}
                onChange={(value)=> setCustomValue("location",value)}
                />
                {/* Now what are we missing here is our map, Lets add our map here */}
                {/* Now we are going to import our map in a different way as it is not supported in react */}
                <Map
                center={location?.latlng}
                />
            </div>
        )
    }


    if (step == STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Share some basics about your place'
                    subtitle='what amenities do you have?'
                />
                {/* It is created in the input folder. */}
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value)=> setCustomValue('guestCount',value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount',value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount',value)}
                />
           </div>
        )
    }






  return (
      <Modal
          isOpen = {rentModal.isOpen}
          title='Airbnb your home'
          actionLabel={actionLabel}
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={step==STEPS.CATAGORY ? undefined : onBack}
          onClose={rentModal.onClose}
          onSubmit={onNext}
          body={bodyContent}
        //   footer={footerContent}
      />
  )
}

export default RentModal