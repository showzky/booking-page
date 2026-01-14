import { useState } from 'react';
import styles from './App.module.css';

interface BookingOrder {date : string, time : string, customerName : string};

function App() {
  const [dato, setDato] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableTimes = ['09:00', '11:00', '13:00', '15:00'];
function sendOrder() {
    // 1. Create the object (the "package")
    const order: BookingOrder= {
      date: dato,
      time: selectedTime,
      customerName: "Ola Nordmann"
    };

    console.log(order); 
    
    // Placeholder for sending order to Python backend later
    alert("Order logic runs! Check the console."); 
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
    <button onClick={sendOrder}>
      Bekreft Bestilling
    </button>
  </div>
) : null}

    </div>
  );
}

export default App;