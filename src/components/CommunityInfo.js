import React, { useEffect } from 'react'
import { useCommunityData } from '../Context/CommunityDataContext';
import { useLocation } from 'react-router-dom';

const CommunityInfo = () => {

    const { communityData, setCommunityData } = useCommunityData();

    const location = useLocation();

    useEffect(() => {
        const communityName = location.pathname.split('/').pop();

        fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/communities/${communityName}`)
            .then(response => response.json())
            .then(data => {
                setCommunityData(data);
            })
    }, [location.pathname, setCommunityData])


    return (
        <div>
            <div>
                {communityData && communityData.name}
            </div>
        </div>
    )
}

export default CommunityInfo