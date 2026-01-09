export interface CatalogItem {
  id: number;
  href: string;
  imgSrc: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}
