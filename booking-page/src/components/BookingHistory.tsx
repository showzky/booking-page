
// import styles from './App.module.css'; Un comment if needed

import type { BookingOrder } from '../types';

// Her definerer vi hva denne komponenten TRENGER for å virke (Props)
interface Props {
  orders: BookingOrder[];
  onDelete: (index: number) => void;
}

function formatCreatedAt(isoString: string) {
  return new Date(isoString).toLocaleString('nb-NO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function BookingHistory({ orders, onDelete }: Props) {
  return (
    <div>
<h2>Bestillingshistorikk</h2>
{orders.length === 0 ? (
  <p>Ingen bestillinger enda.</p>
) : (
  <ul>
    
    {orders.map((order, index) => (
      <li key={index}>
        {order.date} kl. {order.time} — {order.customerName}
        <button  onClick={() => onDelete(index)}>delete</button>
        <p>Bestilt: {formatCreatedAt(order.createdAt)}</p>
      </li>
    ))}
  </ul>
)}
    </div>
  );
}