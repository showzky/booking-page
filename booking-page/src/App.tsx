import styles from './App.module.css';
import { useState } from 'react';
function App() {
  const [dato, setDato] = useState('');
  return (
    <div className={styles.App}>
      <h1>Bestill time</h1>

      <label>Velg dato:</label>
      <input type="date" value={dato} onChange={(e) => setDato(e.target.value)}/>
    </div>
  )
}

export default App