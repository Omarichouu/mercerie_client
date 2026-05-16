import { NextResponse } from "next/server";

// Cache en mémoire (simple - à améliorer avec Redis en production)
let cachedWilayas = null;
let cacheExpiry = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures en milliseconds

async function callYalidinAPI(endpoint, params = {}) {
  if (!process.env.YALIDINE_API_ID || !process.env.YALIDINE_API_TOKEN) {
    return null;
  }

  const url = new URL(`https://api.yalidine.app/v1/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-API-ID': process.env.YALIDINE_API_ID,
        'X-API-TOKEN': process.env.YALIDINE_API_TOKEN,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function buildWilayasWithPrices() {
  try {
    // 1. Récupérer toutes les wilayas
    const wilayasResponse = await callYalidinAPI('wilayas', { page_size: 100 });
    if (!wilayasResponse?.data) {
      return [];
    }

    const wilayas = wilayasResponse.data;
    const result = [];

    // 2. Pour chaque wilaya, récupérer les tarifs et communes
    for (const wilaya of wilayas) {
      try {
        // Récupérer les tarifs (from Alger - wilaya 16 to this wilaya)
        const feesResponse = await callYalidinAPI('fees', {
          from_wilaya_id: 16,
          to_wilaya_id: wilaya.id
        });

        // Récupérer les communes
        const communesResponse = await callYalidinAPI('communes', {
          wilaya_id: wilaya.id,
          page_size: 100
        });

        // Extraire les données
        const fees = feesResponse?.data || {};
        const communes = communesResponse?.data || [];

        // Mapper les communes avec les suppléments de tarification
        const mappedCommunes = communes.map(commune => {
          const communeId = commune.id.toString();
          const communeFees = fees.per_commune?.[communeId];

          // Le supplement est la différence entre la commune principale et les autres
          // Pour la première commune (chef-lieu), supplement = 0
          const supplement = communeId === wilaya.id.toString() ? 0 : (
            communeFees?.express_home ? communeFees.express_home - fees.per_commune[wilaya.id]?.express_home : 0
          ) || 0;

          return {
            name: commune.name,
            supplement: Math.max(0, supplement) // Éviter les valeurs négatives
          };
        }).sort((a, b) => a.name.localeCompare(b.name));

        // Récupérer les frais principaux (pour la commune chef-lieu)
        const mainCommuneFees = fees.per_commune?.[wilaya.id];
        const homeDelivery = mainCommuneFees?.express_home || (fees.zone === 1 ? 600 : fees.zone === 2 ? 800 : fees.zone === 3 ? 950 : fees.zone === 4 ? 1000 : 1200);
        const relayPoint = mainCommuneFees?.express_desk || (fees.zone === 1 ? 350 : fees.zone === 2 ? 400 : fees.zone === 3 ? 600 : fees.zone === 4 ? 700 : 1000);

        result.push({
          id: wilaya.id,
          name: `${wilaya.id} - ${wilaya.name}`,
          name_sans_Nm: wilaya.name,
          homeDelivery: homeDelivery,
          relayPoint: relayPoint,
          returnPrice: fees.retour_fee || 250,
          zone: fees.zone || wilaya.zone || 2,
          communes: mappedCommunes.slice(0, 10) // Limiter à 10 communes principales
        });
      } catch (error) {
        // Continuer avec la wilaya suivante
      }
    }

    return result;
  } catch (error) {
    return [];
  }
}

export async function GET(request) {
  try {
    // Vérifier le cache
    const now = Date.now();
    if (cachedWilayas && cacheExpiry && now < cacheExpiry) {
      return NextResponse.json(cachedWilayas, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=86400' // 24 heures
        }
      });
    }

    
    // Construire les données
    const wilayasData = await buildWilayasWithPrices();

    if (wilayasData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Mettre en cache
    cachedWilayas = wilayasData;
    cacheExpiry = now + CACHE_DURATION;

    return NextResponse.json(wilayasData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400',
        'X-Cache': 'MISS'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
