export interface Car {
    id: number;
    category_id: number;
    brand_id?: number | null;
    car_model_id?: number | null;
  
    title: string;
    slug: string;
    cover_image?: string;
    hover_image?: string | null;

    price?: number | null;
    year?: number | null;
    body?: number | null;
    mileage?: number | null;
  
    car_model: any;
    condition: 'used' | 'new' | string;
    transmission?: string | null;
    engine_capacity?: string | null;
    fuel_type?: string | null;
    color?: string | null;
    drive_type?: string | null;
    engine_size?: string | null;
    doors?: string | null;
    cylinder?: string | null;
    seats?: string | null;
    vin?: string | null;
    manufacturer?: string | null;
    chassis_no?: string | null;
    package?: string | null;
    auditor_grade?: string | null;
  
    length?: string | null;
    width?: string | null;
    height?: string | null;
    width_including_mirrors?: string | null;
    wheelbase?: string | null;
    gross_vehicle_weight?: string | null;
    height_including_roof_rails?: string | null;
    max_loading_weight?: string | null;
    luggage_capacity_seats_up?: string | null;
    max_roof_load?: string | null;
    luggage_capacity_seats_down?: string | null;
    no_of_seats?: string | null;
    fuel_tank_capacity?: string | null;
    minimum_kerbweight?: string | null;
    max_towing_weight_braked?: string | null;
    turning_circle?: string | null;
    max_towing_weight_unbraked?: string | null;
  
    short_description?: string | null;
    description?: string | null;
    features?: string[] | null; // stored as JSON in DB
  
    featured: boolean;
    status: boolean;
  
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
    short_description?: string,
    content?: string, 
    published_date?: string,
    blog_review?: number,
    total_comment?: number,
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