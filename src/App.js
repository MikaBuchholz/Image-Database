import './App.css';
import React, {useState} from 'react'
import UploadForm from './pages/uploadImage';
import SearchForm from './pages/SearchForm'
import ImageCollection from './pages/ImageCollection';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const UploadPage = () => {
  const [text, setText] = useState("Upload Seite");

  return(
    <>
      <h1 className = "headline"><u>{text}</u></h1>
     <Router>
      <div>
        <div className = "navigation-container">
          <ul className = "ul-items">
            <li>
              <Link to="/upload" className = "upload" onClick =  {() => setText('Bilder Upload')}>Upload 📁</Link>
            </li>
            <li>
              <Link to="/search" className = "search" onClick =  {() => setText('Bilder Suche')}>Suche 🔎</Link>
            </li>
            <li>
              <Link to="/gallery" className = "search" onClick =  {() => setText('Gallerie')}>Gallerie 🖼️</Link>
            </li>
          </ul>
        </div>

        <Switch>

        <Route path="/gallery">
            <ImageCollection />
          </Route>

          <Route path="/upload">
            <UploadForm />
          </Route>

          <Route path = "/search">
            <SearchForm />
          </Route>

        </Switch>
      </div>
    </Router>
    </>)
}
    
export default UploadPage;
   

    
    