import { useEffect, useState } from 'react';
import { db } from '@vercel/postgres';

function PetsComponent() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const client = await db.connect();

      try {
        await client.query(`CREATE TABLE IF NOT EXISTS Pets ( Name varchar(255), Owner varchar(255) );`);
        const names = ['Fiona', 'Carl', 'Liam', 'Debbie', 'Ian', 'Lip'];
        await Promise.all(names.map(name => client.query(`INSERT INTO Pets (Name, Owner) VALUES ($1, $2)`, [name, 'Frank'])));

        const { rows } = await client.query(`SELECT * FROM Pets`);
        setPets(rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        client.release();
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>List of Pets</h1>
      <ul>
        {pets.map((pet, index) => (
          <li key={index}>{pet.Name} - {pet.Owner}</li>
        ))}
      </ul>
    </div>
  );
}

export default PetsComponent;
