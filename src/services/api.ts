import axios from 'axios';

const API_URL = 'http://localhost/inmobiliaria-api';

export interface Property {
  id: number;
  title: string;
  description: string;
  type: string;
  type_id: number;
  type_name?: string;
  status: string;
  price_ars: number | null;
  price_usd: number | null;
  covered_area: number;
  total_area: number;
  bedrooms: number | null;
  bathrooms: number | null;
  garage: boolean;
  has_electricity: boolean;
  has_natural_gas: boolean;
  has_sewage: boolean;
  has_paved_street: boolean;
  address: string;
  city: string;
  province: string;
  featured: boolean;
  latitude: number | null;
  longitude: number | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  images: PropertyImage[];
  amenities: PropertyAmenities;
  main_image?: string;
}

export interface PropertyImage {
  id: number;
  property_id: number;
  image_url: string;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyAmenities {
  has_pool: boolean;
  has_heating: boolean;
  has_ac: boolean;
  has_garden: boolean;
  has_laundry: boolean;
  has_parking: boolean;
  has_central_heating: boolean;
  has_lawn: boolean;
  has_fireplace: boolean;
  has_central_ac: boolean;
  has_high_ceiling: boolean;
}

export interface PropertyType {
  id: number;
  name: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  msg: string;
  data: T;
}

const api = {
  getPublicProperties: async (): Promise<ApiResponse<Property[]>> => {
    const response = await axios.get(`${API_URL}/properties/public`);
    return response.data;
  },
  
  getPublicProperty: async (id: string): Promise<ApiResponse<Property>> => {
    const response = await axios.get(`${API_URL}/property/public/${id}`);
    return response.data;
  },
  
  getFeaturedProperties: async (): Promise<ApiResponse<Property[]>> => {
    const response = await axios.get(`${API_URL}/properties/public`);
    return response.data;
  },
  
  searchProperties: async (params: any): Promise<ApiResponse<Property[]>> => {
    const response = await axios.get(`${API_URL}/properties/public/search`, { params });
    return response.data;
  },
  
  getPropertyTypes: async (): Promise<ApiResponse<PropertyType[]>> => {
    const response = await axios.get(`${API_URL}/property-types/active`);
    return response.data;
  }
};

export default api;