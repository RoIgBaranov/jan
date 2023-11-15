import React, { useContext, useEffect, useState } from 'react'
import Community from './Community'
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import CommunityDataContext from '../Context/CommunityDataContext';
import { getCommunities } from '../utils/getCommunities';


const Communities = () => {

    const [startIndex, setStartIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [communities, setCommunities] = useState([]);
    const itemsPerPage = 12;
    const {communitiesData} = useContext(CommunityDataContext);

    useEffect(() => {
        communitiesData.length !==0 ?  setCommunities(communitiesData) : getCommunities(setCommunities);

    }, [])
    const filteredCommunities = communities.filter((community) =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const visibleItems = filteredCommunities.slice(startIndex, startIndex + itemsPerPage);


    const nextItems = () => {
        setStartIndex(prev => Math.min(prev + itemsPerPage, filteredCommunities.length - itemsPerPage));
    };

    const prevItems = () => {
        setStartIndex(prev => Math.max(prev - itemsPerPage, 0));
    };

    return (
        <div>{!communities.length ? <LoadingSpinner /> : <div> <div>
            <label> Communities:
                <input placeholder='type community name'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
            <Link to="/communities/add">
                <button className='propose-button'>Propose new Community</button>
            </Link>

        </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '60%', margin: '0 auto' }}>
                {visibleItems.map((item, index) => <Community key={index} item={item} />)}
            </div>
            <button onClick={prevItems} disabled={startIndex === 0}>Previous page</button>
            <button onClick={nextItems} disabled={startIndex >= filteredCommunities.length - itemsPerPage}>Next page</button></div>}

        </div>
    )
}

export default Communities