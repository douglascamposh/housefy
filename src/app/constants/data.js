


export const categories = [
    { id: '1', name: 'Urbanizaciones' },
    { id: '2', name: 'Departamentos' },
];

export const departments = [
    'Pando', 'Beni', 'Cochabamba', 'La Paz', 'Oruro', 'Potosí', 'Santa Cruz', 'Tarija','Sucre'
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
    category: '',
    totalProperties: 0,
    propertiesAvailable: 0,
};

export const userCreateScheme={ 
  email:"",
  password: "",
  confirmPassword: '', 
  firstName:"", 
  lastName:"",
  phoneNumber:""
}
  