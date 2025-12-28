export interface Accommodation {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  room_size_name: string;
  max_guest: number;
  bed: string;
  view: string;
  price: string; 
  currency_symbol: string;
  quantity: number;
  available_rooms: number;
  booked_rooms: number;
  under_maintenance: number;
  short_description?: string | null;
  description?: string | null;
  image: string;
  gallery_images: { id: number; image: string }[];
  related_accommodations?: {
    title: string;
    slug: string;
    cover_image: string;
    category_name: string;
    size_name: string;
    currency: string;
    short_description?: string | null;
    available_rooms: number;
    max_guest: number;
    quantity: number;
    bed: string;
    view: string;
    price: string;
  }[];
  
  bedding: { title: string; icon: string }[];
  room_features: { title: string; icon: string }[];
  bath_features: { title: string; icon: string }[];
  furniture: { title: string; icon: string }[];
  foods: { title: string; icon: string }[];
  amenities: { title: string; icon: string }[];

  // Optional timestamps (if you track creation/update)
  created_at?: string;
  updated_at?: string;
}


  export interface Picture {
    id: number;
    image: string;
    title: string;
  }

  export interface Page {
    id: number,
    title: string,
    content: string,
  }

  export interface Blog{
    id: number,
    thumbnail?: string,
    title: string,
    category: string,
    short_description?: string,
    content?: string, 
    published_date?: string,
    blog_review?: number,
    total_comment?: number,
    latest_blogs?: Blog[],
    trending_blogs?: Blog[],
  }

  export interface Brand {
    id: number;
    slug: string;
    name: string;
    cars: Car[];
    models: [];
    logo?: string | null;
    banner?: string | null;
    image?: string | null;
    description?: string | null;
  }

  export interface Offer{
    id: number;
    title: string;
    image: string;
    category: string;
    offer: string;
    start_date: string;
    expiry_date: string;
    tag_line: string[];
  }


  export interface Testimonial{
    id: number;
    name: string;
    address: string;
    image: string;
    rating: number;
    description: string;
    total_stayed: string;
  }

  export interface Faqs{
    id: number;
    question: string;
    answer: string;
    open: boolean;
  }

  export interface Service{
    id: number;
    title: string;
    category: string;
    slug: string;
    image: string;
    price: number;
    price_note?: string;
    hours: string;
    short_description: string;
    description: string;
    latest_service: null|Service[];
  }

  export interface Dining{
    id: number;
    title: string;
    category: string;
    slug: string;
    image: string;
    price: number;
    price_note?: string;
    hours: string;
    short_description: string;
    description: string;
    latest_dining: null|Dining[];
  }