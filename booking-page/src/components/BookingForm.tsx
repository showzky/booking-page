import styles from '../App.module.css';
import type { TimeStrings } from '../types';

interface Props {
  dato: string;
  selectedTime: TimeStrings | '';
  name: string;
  address: string;
  phone: string;
  email: string;

  availableTimes: TimeStrings[];
  isReadyToConfirm: boolean;

  onDateChange: (nextDate: string) => void;
  onTimeSelect: (time: TimeStrings) => void;
  onNameChange: (nextName: string) => void;
  onAddressChange: (nextAddress: string) => void;
  onPhoneChange: (nextPhone: string) => void;
  onEmailChange: (nextEmail: string) => void;
  onConfirm: () => void;
}

export function BookingForm({
  dato,
  selectedTime,
  name,
  address,
  phone,
  email,
  availableTimes,
  isReadyToConfirm,
  onDateChange,
  onTimeSelect,
  onNameChange,
  onAddressChange,
  onPhoneChange,
  onEmailChange,
  onConfirm,
}: Props) {
  return (
    <div>
            <label>Velg dato:</label>

      <input
        type="date"
        value={dato}
        onChange={(e) => onDateChange(e.target.value)}
      />

      {availableTimes.map((time) => (
        <button
          key={time}
          className={time === selectedTime ? styles.selected : styles.timeButton}
          onClick={() => onTimeSelect(time)}
          
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
      
      onChange={(e) => onNameChange(e.target.value)}
      />
      {name.trim() === '' ? <p>Skriv navn for å fortsette.</p> : null}
      <label>Adresse:</label>
<input
  type="text"
  value={address}
  onChange={(e) => onAddressChange(e.target.value)}
/>
{address.trim() === '' ? <p>Skriv adresse for å fortsette.</p> : null}

<label>Telefonnummer:</label>
<input
  type="tel"
  value={phone}
  onChange={(e) => onPhoneChange(e.target.value)}
/>
{phone.trim() === '' ? <p>Skriv telefonnummer for å fortsette.</p> : null}

<label>E-post:</label>
<input
  type="email"
  value={email}
  onChange={(e) => onEmailChange(e.target.value)}
/>
{email.trim() === '' ? <p>Skriv e-post for å fortsette.</p> : null}
    <button
      type="button"
      
      onClick={onConfirm}
      disabled={!isReadyToConfirm}
    >
      
      Bekreft Bestilling
    </button>
  </div>
) : null}

    </div>
  );
}