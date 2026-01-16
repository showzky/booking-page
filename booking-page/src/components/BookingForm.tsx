import styles from '../App.module.css';
import type { TimeStrings } from '../types';

interface Props {
  dato: string;
  selectedTime: TimeStrings | '';
  name: string;

  availableTimes: TimeStrings[];
  isReadyToConfirm: boolean;

  onDateChange: (nextDate: string) => void;
  // ADD THIS
  onTimeSelect: (time: TimeStrings) => void;
  onNameChange: (nextName: string) => void;
  onConfirm: () => void;
}

export function BookingForm({
  dato,
  selectedTime,
  name,
  availableTimes,
  isReadyToConfirm,
  onDateChange,
  onTimeSelect,
  onNameChange,
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
      // ADD THIS
      onChange={(e) => onNameChange(e.target.value)}
      />
      {name.trim() === '' ? <p>Skriv navn for å fortsette.</p> : null}
    <button
      // ADD THIS
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