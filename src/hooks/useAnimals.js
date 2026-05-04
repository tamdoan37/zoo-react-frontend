import { useState, useEffect } from 'react';

export const useAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch( 'https://zoo-api-dotnet.onrender.com/api/animals');
        if (!response.ok) throw new Error('Failed to fetch animals');
        const data = await response.json();
        setAnimals(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  return { animals, loading, error };
};
