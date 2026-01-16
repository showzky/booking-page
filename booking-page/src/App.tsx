import { useState } from 'react';
import styles from './App.module.css';
import { isTimeString } from './types';
import type { BookingOrder, TimeStrings } from './types';
import { BookingHistory } from './components/BookingHistory';
import { BookingForm } from './components/BookingForm';

function App() {
  const [dato, setDato] = useState('');
  const [selectedTime, setSelectedTime] = useState<TimeStrings | ''>('');
  const [name, setName] = useState('');
  const [orders, setOrders] = useState<BookingOrder[]>([]);
  const isReadyToConfirm = Boolean(dato && selectedTime && name.trim());
  function deleteOrder(index: number) {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  }

  // ADD THIS
  // Later this can come from an API as string[]
  const rawAvailableTimes: string[] = ['09:00', '11:00', '13:00', '15:00'];
  // ADD THIS
  const availableTimes: TimeStrings[] = rawAvailableTimes.filter(isTimeString);
  

  function onConfirm() {

    if (!isReadyToConfirm) {
      alert('Fyll inn dato, tid og navn først.');
      return;
    }

    // ADD THIS
    // Extra narrowing for TypeScript (should be impossible when isReadyToConfirm is true)
    if (selectedTime === '') {
      return;
    }
    
    const createdAt = new Date().toISOString();

    // 1. Create the object (the "package")
    const order: BookingOrder = {
      date: dato,
      time: selectedTime,
      customerName: name,
      createdAt: createdAt,
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
      <h1>Bestill time</h1>

      <BookingForm
        dato={dato}
        selectedTime={selectedTime}
        name={name}
        availableTimes={availableTimes}
        isReadyToConfirm={isReadyToConfirm}
        onDateChange={(nextDate) => setDato(nextDate)}
          onTimeSelect={(time) => setSelectedTime(time)}
        onNameChange={(nextName) => setName(nextName)}
        onConfirm={onConfirm}
      />



<BookingHistory orders={orders} onDelete={deleteOrder} />

    </div>
  );
}

export default App;