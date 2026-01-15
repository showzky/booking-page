import { useState } from 'react';
import styles from './App.module.css';

interface BookingOrder {date : string, time : string, customerName : string};

function App() {
  const [dato, setDato] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const isReadyToConfirm = Boolean(dato && selectedTime && name.trim())

  const availableTimes = ['09:00', '11:00', '13:00', '15:00'];
function sendOrder() {

    if (!isReadyToConfirm) {
      alert('Fyll inn dato, tid og navn først.');
      return;
    }

    // 1. Create the object (the "package")
    const order: BookingOrder= {
      date: dato,
      time: selectedTime,
      customerName: name
    };

    console.log(order); 
    
    // Placeholder for sending order to Python backend later
    alert("Order logic runs! Check the console."); 
    setDato('');
    setSelectedTime('');
    setName('');
  };
  


  return (
    <div className={styles.App}>
      <h1>Bestill time</h1>

      <label>Velg dato:</label>

      <input
        type="date"
        value={dato}
        onChange={(e) => setDato(e.target.value)}
      />

      {availableTimes.map((time) => (
        <button
          key={time}
          className={time === selectedTime ? styles.selected : styles.timeButton}
          onClick={() => setSelectedTime(time)}
          
        >
          {time}
        </button>
      ))}

      <p>
        Valgt: {dato} kl. {selectedTime}
      </p>

{dato && selectedTime ? (
  <div className={styles.confirmation}>
    <p>Du bestiller time: {dato} kl. {selectedTime}</p>
    <label>Navn:</label>
      <input 
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      {name.trim() === '' ? <p>Skriv navn for å fortsette.</p> : null}
    <button onClick={sendOrder} disabled={!isReadyToConfirm}>
      
      Bekreft Bestilling
    </button>
  </div>
) : null}

    </div>
  );
}

export default App;