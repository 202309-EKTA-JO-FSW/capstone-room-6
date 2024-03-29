import React, { useState, useEffect } from 'react'; // Added import for useState
import { useRouter } from 'next/router';
import NavbarAfter from "@/components/navbar-after";
import NavbarBefore from '@/components/navbar-before';
import Link from 'next/link'

const SingleRestaurant = () => {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [hasCreatedItem, setHasCreatedItem] = useState(false); 
  const [isReadyToTakeOrders, setIsReadyToTakeOrders] = useState(false); 

  useEffect(() => {
    const collection = localStorage.getItem('collection');
    const newCollection = JSON.parse(collection)
    if (!newCollection) {
      setMessage('Unauthorized access, please sign in first')
      const timer = setTimeout(() => {
        window.location.href = '/restaurants/signin';
      }, 5000)
      return () => clearTimeout(timer);
    } else {
      const token = newCollection.token

      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <h2 style={{ color: 'red' }}>{message}</h2>
  } else {

  return (
    <>
      {isAuthenticated && <NavbarAfter />}
      {!isAuthenticated && <NavbarBefore />}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Welcome!</p>
        {!hasCreatedItem && (
          <>
            <p>If you haven't created the menu yet, start creating it for your restaurant:</p>
            <Link style={{ padding: '10px', margin: '10px', backgroundColor: 'blue', color: 'white', borderRadius: '5px', textDecoration: 'none' }} href={'/restaurants/menu'}>Start creating your menu!</Link>
          </>
        )}
        {isReadyToTakeOrders ? (
          <button style={{ padding: '10px', margin: '10px', backgroundColor: 'red', color: 'white', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setIsReadyToTakeOrders(false)}>Stop taking orders</button>
        ) : (
          <button style={{ padding: '10px', margin: '10px', backgroundColor: 'green', color: 'white', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setIsReadyToTakeOrders(true)}>Start taking orders</button>
        )}
        <h2 style={{ color: 'red' }}>{message}</h2>
      </div>
    </>
  );
};
}

export default SingleRestaurant;

