import React from 'react'

export const Loader = ({numberOfSkeletons = 4}) => {
    // return [...Array(numberOfSkeletons)].forEach((_, i) => 
        return (
            <div role="status" className="max-w-sm animate-pulse mr-4">
                <div className="h-216 w-211 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
        )
    // )
};
