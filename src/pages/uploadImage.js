import React, {useState } from 'react'
import { storage, collection, storageFiles } from "../firebase";
import "../App.css"


const UploadForm = () => {
    const [downloadURL, setDownloadURL] = useState("");
    const [tags, setTags] = useState([]);
    const [display, setDisplay] = useState("");
    const [message, setMessage] = useState("");
    const [style, setStyle] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanInput = display.trim()
        
        if (display.length > 0 && !tags.includes(cleanInput)) {
            setTags(tags => [cleanInput, ...tags])
            setMessage("")
            setDisplay("")
        } 

        if (tags.includes(display)) {
            setMessage('Tag bereits gelistet ❌')
            setStyle({color: "firebrick"})
       }
    }
    
    const deleteItem = (e) => {
       console.log("WOCKY SLUSH 🍿")

       for (let index = 0; index < tags.length; index++) {
           if (tags[index] === e.target.innerText) {
               tags.splice(index, 1)
               setTags([...tags])
           }
       }
    }

    const getStorageItems = async () => {
        const items = await storageFiles.listAll().then(result => {return result})
        const fileNames = items.items.map(item => {return item.fullPath})
        
        return fileNames
    }
    
    const handleChange = (e) => {
        e.preventDefault();       
        setDisplay(display => e.target.value)
    }

    const uploadToCollection = () => {
        if (downloadURL.length > 0 && tags.length > 0) {
            collection.add({imageURL: downloadURL, tags: tags})
            setDownloadURL("")
            setTags([])

            setMessage('Upload erfolgreich ✔️')
            setStyle({color: 'green'})

        } else {
            setMessage('Kein Bild / Keine Tags ❌')
            setStyle({color: 'firebrick'})
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const storageFiles = await getStorageItems();
      
        if (!storageFiles.includes(e.target.files[0].name)) {
            if (e.target.files[0]) {
                const fileObj = e.target.files[0]

                const uploadImg = storage.ref(fileObj.name).put(fileObj)
                    uploadImg.on(
                        "state_changed",
                        snapshot => {
                            const progress = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        },
                        error => {
                            console.log(error);
                        },
                        () => {
                        storage
                            .ref()
                            .child(fileObj.name)
                            .getDownloadURL().then(url => {setDownloadURL(url)})
                        }
                    );

                setMessage('Bild Akzeptiert ✔️')
                setStyle({color: 'green'})
            }
        } else {
            setMessage('Bildname bereits vergeben ❌')
            setStyle({color: 'firebrick'})
        }
    }

    return ( <>
        {downloadURL !== "" ? <div className = "img"><img src = {downloadURL} className = "imgItself" alt = "new" width = "800px" height = "300px" onClick={() => setDownloadURL("")}/></div>: <div></div>}

        <form onSubmit={handleSubmit} className = "formElement" autoComplete = "off">
            <div>
                <button className = "hideButton">Bild Auswählen 📁</button>
                <input 
                    type="file" 
                    onChange={handleUpload}
                    className = "fileInput"
                />
            </div>

            <div>
                <input
                    name="text"
                    placeholder="tags🏷️..."
                    onChange={handleChange}
                    value={display}
                    className = "textInput"
                />
                <p className = "messageDisplay" id = "messageDisplay" style = {style}>{message}</p>
            </div>

            <div>
                <button type="button" onClick={uploadToCollection} className="uploadButton">Upload ⬆️</button>
            </div>

        </form>

        <div className = "tagContainer">
            {tags.map((text, index) => <div key = {index} className = "tagClass" onClick = {(e) => deleteItem(e)}>{text}</div>)}
        </div>

        </>
        )
}

export default UploadForm;



