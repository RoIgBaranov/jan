import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import ProfilePage from './ProfilePage';
import avatar from '../images/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import CommunityDataContext from '../Context/CommunityDataContext';
import { getCommunities } from '../utils/getCommunities';

const ProfileEdit = () => {

    const { user, setUser, authHeader, logout } = useContext(AuthContext);
    const location = useLocation();

    const [editingField, setEditingField] = useState(null);
    const [editedValue, setEditedValue] = useState('');
    const [communities, setCommunities] = useState([]);
    const { communitiesData } = useContext(CommunityDataContext);
    const [editing, setEditing] = useState('');
    const [editPass, setEditPass] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [userCommunities, setUserCommunities] = useState({ communities: [...user.communities] });
    const [deletedCommunity, setDeletedCommunity] = useState({ communities: [] });
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [checkNewPass, setCheckNewPass] = useState('');
    const [message, setMessage] = useState('');
    const [deleteUser, setDeleteUser] = useState(false);

    useEffect(() => {
        communitiesData.length !== 0 ? setCommunities(communitiesData) : getCommunities(setCommunities);

    }, [])

    const handleEditField = (field, value) => {
        setEditingField(field);
        setEditedValue(value);
    }

    const profileId = location.pathname.split('/').pop();
    const handleSaveField = () => {

        if (editingField === 'name' || editingField === 'education') {
            fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/${profileId}/${editingField}/${editedValue}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader
                }

            })
                .then(response => response.json())
                .then(data => setUser(data))
        }
        if (editingField === 'location') {
            const newCountry = editedValue.split(',').shift();
            const newCity = editedValue.split(',').pop();
            const newLocation = {
                city: newCity,
                country: newCountry,
            }


            fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/${profileId}/location`, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLocation)

            })
                .then(response => response.json())
                .then(data => setUser(data))
        }
        setEditingField(null);
    }


    const handleCancelEdit = () => {
        setEditingField(null);
    }


    const handleEdit = (type) => {
        setEditing(type);
    }

    const handleAddCommunity = () => {
        if (selectedCommunity) {
            setUserCommunities({ communities: [...userCommunities.communities, selectedCommunity] });
            setSelectedCommunity('');
        }
    }

    const handleDeleteCommunity = (community) => {
        setDeletedCommunity({ communities: [...deletedCommunity.communities, community] })
    }

    const handleSave = () => {
        fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/${profileId}/communities`, {
            method: 'PUT',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCommunities)

        })
            .then(response => response.json())

        setEditing(false);
    }

    const handleDelete = () => {
        fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/${profileId}/communities`, {
            method: 'DELETE',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deletedCommunity)

        })
            .then(response => response.json())

        const updatedCommunititesList = userCommunities.communities.filter(item => !deletedCommunity.communities.includes(item));

        setUserCommunities({ communities: updatedCommunititesList })
        setDeletedCommunity({ communities: [] })
        setEditing(false);
    }

    const savePass = () => {
        const tokken = `${user.email}:${oldPass}`
        const encodedTokken = btoa(tokken);
        const tokkenForCheck = `Basic ${encodedTokken}`;
        if (newPass === checkNewPass) {
            fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/password/change`, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader,
                    'X-Password': newPass,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(data => Promise.reject(data.message))
                    }
                })
                .catch(error => {
                    console.error('Произошла ошибка:', error);
                    setMessage(error);
                })
            setEditPass(false)
        }

    }

    const handleDeleteUser = () => {
        fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/${user.email}`, {
            method: 'DELETE',
            headers: {
                'Authorization': authHeader
            }
        })
            .then(response => {
                if (response.ok) {
                    logout();
                }
            })
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                !user.nickname ? <ProfilePage userData /> :
                    <div>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <img style={{ width: '4em', height: '4em' }} alt='avatar' src={avatar}></img>
                                        <button><FontAwesomeIcon icon={faEdit} /></button>
                                        <button><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                    <div>
                                        <div>
                                            <h4>
                                                {editingField === 'name' ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={editedValue}
                                                            onChange={(e) => setEditedValue(e.target.value)}
                                                        />
                                                        <button onClick={handleSaveField}>Сохранить</button>
                                                        <button onClick={handleCancelEdit}>Отменить</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {user.nickname}
                                                        <button onClick={() => handleEditField('name', user.nickname)}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                    </>
                                                )}
                                            </h4>
                                        </div>
                                        <div>
                                            <h4>
                                                {editingField === 'location' ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={editedValue}
                                                            onChange={(e) => setEditedValue(e.target.value)}
                                                        />
                                                        <button onClick={handleSaveField}>Сохранить</button>
                                                        <button onClick={handleCancelEdit}>Отменить</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {`${user.location.country}, ${user.location.city}`}
                                                        <button onClick={() => handleEditField('location', `${user.location.country}, ${user.location.city}`)}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                    </>
                                                )}
                                            </h4>
                                        </div>
                                        <h4>{`Rating: ${user.stats.rating}`}</h4>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h4>Communities:</h4>
                                        <ul>
                                            {userCommunities.communities.map((community, index) => (
                                                <li key={index}>{community}</li>
                                            ))}
                                        </ul>
                                        {!editing ? (
                                            <div>
                                                <button onClick={() => handleEdit('add')}>Add Communities</button>
                                                <button onClick={() => handleEdit('delete')}>Delete Communities</button>
                                            </div>
                                        ) : (
                                            (editing === 'add') ? <div>

                                                <select id='scientific' onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    setSelectedCommunity(selectedValue);
                                                }}>
                                                    {communities
                                                        .filter(item => !userCommunities.communities.includes(item.name))
                                                        .map((item, index) => <option value={item.name} key={index}>{item.name} </option>)}
                                                </select>
                                                <button onClick={handleAddCommunity}>Add</button>
                                                <button onClick={handleSave}>Save</button>
                                            </div> :
                                                <div>
                                                    <select id='scientific' onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        setSelectedCommunity(selectedValue);
                                                    }}>{userCommunities.communities
                                                        .filter(item => !deletedCommunity.communities.includes(item))
                                                        .map((item, index) => <option value={item} key={index}>{item}</option>)}</select>
                                                    <button onClick={() => handleDeleteCommunity(selectedCommunity)}>Add to deleted list</button>
                                                    <button onClick={handleDelete}>Save</button>
                                                    <h4>Deleted list:</h4>
                                                    <ul>
                                                        {deletedCommunity.communities.map((community, index) => (
                                                            <li key={index}>{community}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                        )
                                        }
                                    </div>
                                    <div>
                                        {editingField === 'education' ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editedValue}
                                                    onChange={(e) => setEditedValue(e.target.value)}
                                                />
                                                <button onClick={handleSaveField}>Сохранить</button>
                                                <button onClick={handleCancelEdit}>Отменить</button>
                                            </div>
                                        ) : (
                                            <>
                                                {`Education: ${user.educationLevel}`}
                                                <button onClick={() => handleEditField('education', `${user.educationLevel}`)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <h4>{`Roles: ${user.roles.join(', ')}`}</h4>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <h3>Stats:</h3>
                                    <div style={{ border: '1px solid', width: '20em', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{`Problem Solved: ${user.stats.solvedProblems}`}</p>
                                        <p>{`Cheked Solutions:  ${user.stats.checkedSolutions}`}</p>
                                        <p>{`Problems Formulated:  ${user.stats.formulatedProblems}`}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3>Top Posts (Solutions & New Problems) By Score</h3>
                                    <div style={{ border: '1px solid', width: '20em', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>S 51 Solution for the porblem 42</p>
                                        <p>P 42 New Problem Statement</p>
                                        <p>P 30 New Problem Statement</p>
                                        <p>S 20 New Solution Proposed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>{!editPass ? <button onClick={setEditPass}>Change password</button> :
                            <div>
                                <label>Old password<input type='password' onChange={(e) => setOldPass(e.target.value.trim())}></input></label>
                                <label>New password<input type='password' onChange={(e) => setNewPass(e.target.value.trim())}></input></label>
                                <label>New password again<input type='password' onChange={(e) => setCheckNewPass(e.target.value.trim())}></input></label>
                                <button onClick={savePass}>Save</button>
                            </div>}
                            <div>

                            </div>

                        </div>

                        {!deleteUser ? <button onClick={() => setDeleteUser(true)}>Delete User</button> :
                            <div>
                                <h4>Are you sure about it?</h4>
                                <Link to='/problems'>
                                    <button onClick={handleDeleteUser}>Yes</button>
                                </Link>
                                <button onClick={() => setDeleteUser(false)}>No</button>
                            </div>}

                    </div>
            }

        </div>
    )
}

export default ProfileEdit