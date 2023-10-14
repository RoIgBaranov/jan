export function getCommunities (set){
    fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/communities`)
    .then(response => response.json())
    .then(data => set(data))
    .catch(error => console.log('Error: ', error));
}