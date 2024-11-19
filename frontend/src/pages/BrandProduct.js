import React from 'react'
import { useParams } from 'react-router-dom'

const BrandProduct = () => {
    const params = useParams()

    return (
        <div>
            {
                params?.brandName
            }
        </div>
    )
}

export default BrandProduct