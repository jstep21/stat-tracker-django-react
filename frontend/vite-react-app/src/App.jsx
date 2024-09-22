import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/matches/')
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.log('Error fetching API: ', error);
      });
  }, []);

  useEffect(() => {
    console.log('Updated matches state: ', matches);
  }, [matches]);


  return (
    <div className="App">
      <h1>Today's Matches</h1>
      <ul>
        {matches.length > 0 ? (
          matches.leagues.map((league, index) => (
            <li key={index}>{league.name}</li>
          ))
        ) : (
          <li>No Matches Available</li>
        )}
      </ul>
    </div>
  );
}

export default App;
