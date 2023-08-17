import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio')
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s,.!?:;-]*$/, 'El nombre contiene caracteres no permitidos')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres'),
    description: Yup.string()
    .required('La descripción es obligatoria')
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s,.!?:;-]*$/, 'La descripción contiene caracteres no permitidos')
    .max(200, 'La descripción no debe exceder los 200 caracteres'),
    address: Yup.object().shape({
      street: Yup.string().required('La calle es obligatoria'),
      reference: Yup.string()
      .max(100, 'La referencia no debe exceder los 100 caracteres'),
      streetNumber: Yup.string(),
      state: Yup.string()
      .required('El departamento es obligatorio'),
      city: Yup.string()
      .required('El nombre de la ciudad es obligatorio')
      .matches(/^[a-zA-Z\s]*$/, 'No se permiten caracteres especiales en el nombre de la ciudad'),
    }),
    category: Yup.string()
    .required('La categoría es obligatoria'),
    totalProperties: Yup.number()
    .required('La cantidad de propiedades es obligatoria')
    .integer('Debe ser un número entero mayor que cero')
    .min(1, 'Debe ser mayor que cero'),
    propertiesAvailable: Yup.number()
    .required('La cantidad disponible es obligatoria')
    .integer('Debe ser un número entero').test(
      'properties-available',
      'Las propiedades disponibles no deben ser mayores que el total de propiedades',
      function (value) {
        return value <= this.parent.totalProperties;
      }
    ),
    latitude: Yup.number(),
    longitude: Yup.number()
  });

export default validationSchema;