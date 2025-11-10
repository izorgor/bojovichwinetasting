export type WineRow = {
  winery_name: string | null;
  wine_name: string;
  wine_year: string | null;
  wine_caption_srb: string | null;
  wine_caption_eng: string | null;
  wine_rate: number | null;
  wine_price_rsd: number | null;
  wine_price_eur: number | null;
  wine_image_url: string | null;
  wine_instagram: string | null;
};

export type Wine = {
  id: string; // stabilan ID
  wineryName: string | null; // npr. "Vinarija Deurić"
  name: string; // npr. "Probus 276"
  wineryHandle: string | null; // npr. "vinarijadeuric"
  year: string | null; // izvučeno iz naziva (ako postoji 4-cifren broj)
  rating: number | null; // 0–10
  priceRsd: number | null;
  priceEur: number | null;
  captionSrb: string | null;
  captionEng: string | null;
  imageUrl: string | null;
};
