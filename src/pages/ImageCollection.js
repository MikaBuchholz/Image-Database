import React, {useEffect, useState} from 'react'
import { collection } from '../firebase'
import '../App.css'

const ImageCollection = () => {
    const [urls, setUrls] = useState([]);

    const getEveryImageURL = async () => {
        const collectionDataRaw = await collection.get()
        const collectionData = collectionDataRaw.docs.map((doc) => {return doc.data()})
        const imageURLs = collectionData.map((data) => {return data.imageURL})
        const filteredArray = imageURLs.filter((item) => {return item !== 'null'})

        setUrls([...filteredArray])
    }

    useEffect(() => {
        getEveryImageURL()
    }, [])

  
    return (<>
    <div className = "collection">{urls.map((url, index) => <div className = "imageWrapper"> {url.length > 0 ? <img src = {url} alt = "new" target ="_blank" onClick = {() => window.open(url, '_blank', 'noopener,noreferrer')} key = {index} className = "searchImages"/> : <img src = 'https://via.placeholder.com/300/282c34?text=Bild+Nicht+Gefunden' alt = "new"/> } </div>)}</div>
   
    </>)

}

export default ImageCollection;