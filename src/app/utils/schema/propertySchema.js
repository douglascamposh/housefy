export const categories = [
  { id: '1', name: 'Urbanizaciones' },
  { id: '2', name: 'Departamentos' },
];

export const departments = [
  'Pando', 'Beni', 'Cochabamba', 'La Paz', 'Oruro', 'Potosí', 'Santa Cruz', 'Tarija', 'Sucre'
];

export const propertyScheme = {
  name: '',
  description: '',
  address: {
    street: '',
    reference: '',
    streetNumber: '',
    city: '',
    country: 'Bolivia',
    latitude: 0,
    longitude: 0,
    state: '',
  },
  images: [],
  category: ''
};

export const userCreateScheme = {
  email: "",
  password: "",
  confirmPassword: '',
  name: "",
  lastName: "",
  phoneNumber: ""
};

export const subPropertiesScheme = {
  code: "",
  size: 0,
  price: 0,
  isAvailable: true,
  commonArea: false,
};

export const customerScheme = {
  name: "",
  lastName: "",
  phoneNumber: "",
  ci: '',
  extensionCi: "",
  address: {
    street: "",
    reference: "",
    streetNumber: "",
    city: "",
    country: "",
    state: ""
  },
  references: [],
};

export const payScheme = {
  onAccount: 0,
  total: 0,
};

export const subPropertySaleScheme = {
  onAccount: 0,
  total: 0,
  subPropertyId: "",
  propertyId: "",
  status: "",
  customer: customerScheme
};

export const computeFormSchema = {
  total: "",
  downPayment: "",
  months: "",
  startDate: new Date(),
};
