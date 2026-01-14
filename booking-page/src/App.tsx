import styles from './App.module.css';
import { useState } from 'react';
function App() {
  const [dato, setDato] = useState('');
  const availableTimes = ["09:00", "11:00", "13:00", "15:00"];
  return (
    <div className={styles.App}>
      <h1>Bestill time</h1>

      <label>Velg dato:</label>
      <input type="date" value={dato} onChange={(e) => setDato(e.target.value)}/>
      {availableTimes.map((time) => 
        <button key="time" className="styles.timeButton">{time}</button>
      )}
    </div>
  )
}

export default App