import { useEffect, useState } from "react";

interface Pet {
  name: string;
  owner: string;
  // Add more properties if necessary
}

function PetsList() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await fetch("/api/add-pet");
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }
        const data = await response.json();
        // Extract the rows containing pet data from the response
        const petsData = data.pets.rows || [];
        setPets(petsData);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    }

    fetchPets();
  }, []);

  return (
    <div>
      <h1>List of Pets</h1>
      <ul>
        {pets.map((pet, index) => (
          <li key={index}>
            {pet.name} - {pet.owner}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetsList;
