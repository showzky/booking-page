import { useState } from 'react';
import styles from './App.module.css';
import { isTimeString } from './types';
import type { BookingOrder, TimeStrings } from './types';
import { BookingHistory } from './components/BookingHistory';
import { BookingForm } from './components/BookingForm';
import { DarkModeToggle } from './themetoggle/DarkModeToggle';
import type { DarkMode } from './themetoggle/DarkModeToggle';
import useEffect from 'react';
import { useState } from 'react';

function App() {
  const [dato, setDato] = useState('');
  const [selectedTime, setSelectedTime] = useState<TimeStrings | ''>('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [orders, setOrders] = useState<BookingOrder[]>([]);
  const isReadyToConfirm = Boolean(dato && selectedTime && name.trim() && address && phone && email);
  function deleteOrder(index: number) {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  }

  const [mode, setMode] = useState<DarkMode>('light');

function toggleMode() {
  setMode((prevMode) => {
    if ((prevMode === 'light')) {
      return 'dark';
    } else {
      return 'light';
    }
  });
}


  // Later this can come from an API as string[]
  const rawAvailableTimes: string[] = ['09:00', '11:00', '13:00', '15:00'];

  const availableTimes: TimeStrings[] = rawAvailableTimes.filter(isTimeString);
  

  function onConfirm() {

    if (!isReadyToConfirm) {
      alert('Fyll inn dato, tid, navn, adresse, telefon og e-post først.');
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
    setAddress('');
    setPhone('');
    setEmail('');
  };
  


  return (
    <div className={styles.App}>
      <h1>Bestill time</h1>
    <div className={styles.toggleButton}>
      <DarkModeToggle mode={mode} toggleMode={toggleMode} />
    </div>
     

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
        address={address}
        onAddressChange={(nextAddress) => setAddress(nextAddress)}
        phone={phone}
        onPhoneChange={(nextPhone) => setPhone(nextPhone)}
        email={email}
        onEmailChange={(nextEmail) => setEmail(nextEmail)}
      />



<BookingHistory orders={orders} onDelete={deleteOrder} />

    </div>
  );
}

export default App;