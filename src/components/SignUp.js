import React, { useEffect, useState } from 'react'


const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [education, setEducation] = useState('');
    const [scientific, setScientific] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassowrd] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [countries, setCountries] = useState([]);


    //Submit button for registraiton
    const handleRegistration = async () => {
        const userData = {
            name,
            email,
            education,
            scientific,
            country,
            password,
            confirmPass
        }
        
        console.log(userData);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                //TODO 
            } else {
                //TODO
            }
        } catch (error) {
            //TODO
        }

    }


    //Get countries for dropdown list
    //Почему два раза отправляется запрос на сервер?
    const getCountries = async () => {
        const url = 'https://geography4.p.rapidapi.com/apis/geography/v1/country?independent=true&unMember=true&status=officially-assigned&startOfWeek=Monday&landlocked=true';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '681959c05bmsh8b0dd878dca560cp1009b5jsn5a575e761b8f',
                'X-RapidAPI-Host': 'geography4.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const countriesNames = result.map(item => item.name.common);
            setCountries([" ", ...countriesNames]);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCountries()
    }, [])



    return (
        <div>
            <h3>Sign Up Form</h3>
            <div>
                <label>Display name:
                    <input type='text' id='username' value={name} onChange={(e) => setName(e.target.value.trim())} />
                </label>
                <label>Email:
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>Highest education level:
                    <input type='text' id='education' value={education} onChange={(e) => setEducation(e.target.value)} />
                </label>
                <label>Scientific interests:
                    <input type='text' id='scientific' value={scientific} onChange={(e) => setScientific(e.target.value)} />
                </label>
                <label>Location:
                    <select id='country' onChange={(e) => setCountry(e.target.value)}>{
                        countries.map((item, index) => <option value={item} key={index}>{item}</option>)
                    }</select>
                </label>
                <label>Password:
                    <input type='password' id='password' value={password} onChange={(e) => setPassowrd(e.target.value)} />
                </label>
                <label>Confirm Password:
                    <input type='password' in='confirmPass' value={confirmPass} onChange={e => setConfirmPass(e.target.value)}/>
                </label>
                <button onClick={handleRegistration}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp