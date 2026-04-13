import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const geoapifyKey = process.env.GEOAPIFY_API_KEY;
  
  if (!geoapifyKey) {
    console.error('GEOAPIFY_API_KEY is missing in env');
    return NextResponse.json(
      { error: 'Geoapify API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${geoapifyKey}`
    );

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`);
    }

    const data = await response.json();
    
    const suggestions = (data.features || []).map((feature: any) => ({
      id: feature.properties.place_id || feature.properties.osm_id || Math.random().toString(),
      place_name: feature.properties.formatted,
    }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location suggestions' },
      { status: 500 }
    );
  }
}
