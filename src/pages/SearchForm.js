import React, {useState} from 'react'
import '../App.css'
import {collection } from "../firebase";

const SearchForm = () => {
    const [display, setDisplay] = useState("");
    const [searchTags, setSearchTags] = useState([]);
    const [imgURL, setImgURL] = useState([]);
    const [style, setStyle] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setDisplay(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanInput = display.trim()

        if (display.length > 0 &&  searchTags.includes(cleanInput) === false) {    
            setSearchTags(tags => [cleanInput, ...tags])
            setMessage("")
            setDisplay("")
        } 

        else if (searchTags.includes(display) === true) {
            setMessage('Tag bereits gelistet ❌')
            setStyle({color: "firebrick"})
            setDisplay("")
       }
    }

    const deleteItem = (e) => {
        console.log("WOCKY SLUSH 🍿")
        e.preventDefault();
 
        for (let index = 0; index < searchTags.length; index++) {
            if (searchTags[index] === e.target.innerText) {
                searchTags.splice(index, 1)
                setSearchTags([...searchTags])
            }
        }
     }

    const clearArrays = (e) => {
        setMessage("")
        setDisplay("")
        setSearchTags([])
        setImgURL([])
    }

    const findTags = async () => {
        if (searchTags.length > 0) {
            const foundTags = await collection.where("tags", "array-contains-any", searchTags).get()
            const data = foundTags.docs.map((doc) => {return doc.data()})
            const imageURLArray = data.map(data => {return data.imageURL})
            
            if (imageURLArray.length > 0) {
                
                setMessage('Suche erfolgreich ✔️')
                setStyle({color: "green"})

                setImgURL([...imageURLArray])

            } else if (imageURLArray.length <= 0) {
                setMessage('Keine passenden Bilder gefunden ❌')
                setStyle({color: "firebrick"})
            }

        } else {
            setMessage('Kein Bild / Keine Tags ❌')
            setStyle({color: "firebrick"})
        }
    }

    return (<>
    <form className = 'searchForm' onSubmit = {handleSubmit} autoComplete = "off">

    <button type = 'button' className = 'clearButton' onClick = {clearArrays} >Clear🧹</button>

        <input
            name = "search"
            placeholder="tags🏷️..."
            onChange={handleChange}
            value={display}
            className = "searchInput"
        />
        <button type = "button" className = "searchButton" onClick = {findTags}>Suchen 🔎</button>

    </form>

    <p className = "messageDisplay" id = "messageDisplay" style = {style}>{message}</p>

    <div className = "searchTagContainer">
        {searchTags.map((text, index) => <div key = {index} className = "tagClass" onClick = {(e) => deleteItem(e)}>{text}</div>)}
    </div>

    <div className = "imageContainer">
        {imgURL.map((url, index) => <div key = {index} className = "imageWrapper"> {url.length > 0 ? <img src = {url} alt = "new" target ="_blank" onClick = {() => window.open(url, '_blank', 'noopener,noreferrer')} key = {index} className = "searchImages"/>: console.log('Wocky Slush')} </div>)}
    </div>

    </>)
}


export default SearchForm;