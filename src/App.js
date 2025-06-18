
import './App.css';
import NavBar from './components/navbar';
import News from './components/news';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const App = (props) => {


  const [progress, setProgress] = useState(10);
  const apiKey = process.env.REACT_APP_NEWS_API;
  
    return (
      
      <Router>
        <NavBar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={12} category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={12} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={12} category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={12} category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={12} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={12} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={12} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={12} category="technology" />} />
        </Routes>
      </Router>
    )
  
}
export default App;