// src/data/locations.ts

// Lista de provincias (San Luis primero, el resto en orden alfabético)
export const PROVINCES = [
    { id: "san_luis", name: "San Luis" },
    { id: "buenos_aires", name: "Buenos Aires" },
    { id: "catamarca", name: "Catamarca" },
    { id: "chaco", name: "Chaco" },
    { id: "chubut", name: "Chubut" },
    { id: "ciudad_autonoma_de_buenos_aires", name: "Ciudad Autónoma de Buenos Aires" },
    { id: "cordoba", name: "Córdoba" },
    { id: "corrientes", name: "Corrientes" },
    { id: "entre_rios", name: "Entre Ríos" },
    { id: "formosa", name: "Formosa" },
    { id: "jujuy", name: "Jujuy" },
    { id: "la_pampa", name: "La Pampa" },
    { id: "la_rioja", name: "La Rioja" },
    { id: "mendoza", name: "Mendoza" },
    { id: "misiones", name: "Misiones" },
    { id: "neuquen", name: "Neuquén" },
    { id: "rio_negro", name: "Río Negro" },
    { id: "salta", name: "Salta" },
    { id: "san_juan", name: "San Juan" },
    { id: "santa_cruz", name: "Santa Cruz" },
    { id: "santa_fe", name: "Santa Fe" },
    { id: "santiago_del_estero", name: "Santiago del Estero" },
    { id: "tierra_del_fuego", name: "Tierra del Fuego" },
    { id: "tucuman", name: "Tucumán" },
    { id: "las_malvinas", name: "Islas Malvinas" },
    { id: "tierra_del_fuego_antartida", name: "Tierra del Fuego, Antártida e Islas del Atlántico Sur" },
    { id: "exterior", name: "Exterior" },
  ];
  
  // Lista de estados de propiedades
  export const PROPERTY_STATUS = [
    { id: "sale", name: "En Venta" },
    { id: "rent", name: "En Alquiler" },
    { id: "reserved", name: "Reservado" },
    { id: "sold", name: "Vendido" },
    { id: "rented", name: "Alquilado" },
  ];
  
  // Tipos de propiedades
  export const PROPERTY_TYPES = [
    { id: "house", name: "Casa" },
    { id: "apartment", name: "Departamento" },
    { id: "land", name: "Terreno" },
    { id: "office", name: "Oficina" },
    { id: "commercial", name: "Local Comercial" },
    { id: "warehouse", name: "Depósito/Galpón" },
    { id: "farm", name: "Campo/Finca" },
    { id: "other", name: "Otro" },
  ];