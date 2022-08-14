import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const data = require('./homedata.json');

const Home = () => {
  let navigate = useNavigate();
  const [listItems, setListItems] = useState(data.entries);

  const onPageSearch = (event) => {
      let filtered = [...data.entries].filter(function(item) {
        return (item.title).toLowerCase().indexOf((event.target.value).toLowerCase()) > -1;
      });
      setListItems(filtered);
  };
  
  const onProgramClick = (item) => {
    if(item === 'series') {
      navigate('/series');
    } else {
      navigate('/movies');
    }
  }

  return (
      <div>
        <div className="body-container">
            <div className="search-box">
                <i className="fa fa-search"/>
                <input type="text" onChange={onPageSearch.bind(this)}/>
            </div>
            <div>
              <div className="programs-list-container">
                {listItems.map(function(item) {
                  return (
                    <div onClick={onProgramClick.bind(this,item.programType)}>
                      <div className="program-tiles">
                        <img src={item.images.PosterArt.url} alt="image-not-found" height="75" width="75"/>
                      </div>
                      <div className="program-title">{item.title}</div>
                    </div>  
                  )
                })}
              </div>
            </div>
          </div>
      </div>
  );
};


export default Home;
