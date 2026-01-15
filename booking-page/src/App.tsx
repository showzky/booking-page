import { useState } from 'react';
import styles from './App.module.css';
import type { BookingOrder } from './types';

function App() {
  const [dato, setDato] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [orders, setOrders] = useState<BookingOrder[]>([]);
  const isReadyToConfirm = Boolean(dato && selectedTime && name.trim());
  

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
    setOrders((prevOrders) => [...prevOrders, order]);
    console.log(order); 
    
    // Placeholder for sending order to Python backend later
    alert("Order logic runs! Check the console."); 
    setDato('');
    setSelectedTime('');
    setName('');
  };
  


  return (
    <div className={styles.App}>
      {/* ADD THIS */}
      <h1 className={styles.title}>Bestill time</h1>
      {/* ADD THIS */}
      <p className={styles.subtitle}>Velg dato og tidspunkt, så bekrefter du bestillingen.</p>

      {/* ADD THIS */}
      <label className={styles.label}>Velg dato:</label>

      <input
        type="date"
        /* ADD THIS */
        className={styles.input}
        value={dato}
        onChange={(e) => setDato(e.target.value)}
      />

      {/* ADD THIS */}
      <div className={styles.timeGrid}>
        {availableTimes.map((time) => (
          <button
            key={time}
            className={time === selectedTime ? styles.selected : styles.timeButton}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>

      <p className={styles.selectionText}>Valgt: {dato} kl. {selectedTime}</p>

      {dato && selectedTime ? (
        <div className={styles.confirmation}>
          <p>Du bestiller time: {dato} kl. {selectedTime}</p>

          {/* ADD THIS */}
          <label className={styles.label}>Navn:</label>
          <input
            /* ADD THIS */
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {name.trim() === '' ? <p>Skriv navn for å fortsette.</p> : null}

          {/* ADD THIS */}
          <button
            className={styles.confirmButton}
            onClick={sendOrder}
            disabled={!isReadyToConfirm}
          >
            Bekreft Bestilling
          </button>
        </div>
      ) : null}

      {/* ADD THIS */}
      <h2 className={styles.historyTitle}>Bestillingshistorikk</h2>
{orders.length === 0 ? (
  <p>Ingen bestillinger enda.</p>
) : (
  <ul className={styles.historyList}>
    {orders.map((order, index) => (
      <li className={styles.historyItem} key={index}>
        {order.date} kl. {order.time} — {order.customerName}
      </li>
    ))}
  </ul>
)}

    </div>
  );
}

export default App;