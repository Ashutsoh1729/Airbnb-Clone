'use client'
import useSearchModal from '@/app/hooks/useSearchModal'
import React from 'react'
import Modal from './Modal';

const SearchModal = () => {

    const searchModal = useSearchModal();

    console.log(searchModal.isOpen);
    const actionLabel = 'Next'
    
    return (
        <Modal
            isOpen={searchModal.isOpen}
            title='Filter'
            actionLabel={actionLabel}
            // secondaryActionLabel={secondaryActionLabel}
            // secondaryAction={step == STEPS.CATAGORY ? undefined : onBack}
            onClose={searchModal.onClose}
            onSubmit={function (): void {
                throw new Error('Function not implemented.');
            } }            // onSubmit={handleSubmit(onSubmit)}
            // body={bodyContent}
        //   footer={footerContent}
        />
    )

}

export default SearchModal