'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personnalisé pour récupérer les wilayas avec tarifs dynamiques de Yalidin
 * Remplace l'import statique de wilayasWithPrices
 */
export function useWilayas() {
  const [wilayas, setWilayas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWilayas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MY_URL || 'http://localhost:3000'}/api/get_wilayas_dynamic`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: Impossible de récupérer les wilayas`);
      }

      const data = await response.json();
      setWilayas(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWilayas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer les wilayas au montage du composant
  useEffect(() => {
    fetchWilayas();
  }, [fetchWilayas]);

  // Helper function: récupérer une wilaya par ID
  const getWilayaById = useCallback((id) => {
    return wilayas.find(w => w.id === id);
  }, [wilayas]);

  // Helper function: récupérer une wilaya par nom
  const getWilayaByName = useCallback((name) => {
    return wilayas.find(w => w.name_sans_Nm === name);
  }, [wilayas]);

  // Helper function: récupérer les communes d'une wilaya
  const getCommunesByWilaya = useCallback((wilayaId) => {
    const wilaya = getWilayaById(wilayaId);
    return wilaya?.communes || [];
  }, [getWilayaById]);

  return {
    wilayas,
    loading,
    error,
    fetchWilayas, // Permet de rafraîchir manuellement
    getWilayaById,
    getWilayaByName,
    getCommunesByWilaya,
  };
}
