import * as Yup from 'yup';


export const validationPropertySchema = Yup.object().shape({
    name: Yup.string()
    .required('El nombre es obligatorio')
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s,.!?:;-]*$/, 'El nombre contiene caracteres no permitidos')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres'),
    description: Yup.string()
    .required('La descripción es obligatoria')
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s,.!?:;-]*$/, 'La descripción contiene caracteres no permitidos')
    .max(400, 'La descripción no debe exceder los 400 caracteres'),
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
    latitude: Yup.number(),
    longitude: Yup.number()
  });

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("El correo electrónico es requerido")
    .email("Ingresa un correo electrónico válido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña no puede tener más de 50 caracteres")
});


export const validationRegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required("El correo electrónico es requerido")
    .email("Ingresa un correo electrónico válido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña no puede tener más de 50 caracteres")
    .matches(
      /^(?=.*[a-z])/,
      "La contraseña debe contener al menos una letra minúscula"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "La contraseña debe contener al menos una letra mayúscula"
    )
    .matches(
      /^(?=.*\d)/,
      "La contraseña debe contener al menos un número"
    ),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
  firstName: Yup.string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  lastName: Yup.string()
    .required("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  phoneNumber: Yup.string()
    .required("El número de teléfono es requerido")
    .matches(
      /^[0-9]{8,15}$/,
      "Ingresa un número de teléfono válido"
    ),
});

export const validationSubPropertySchema = Yup.object().shape({
  code: Yup.string().required('El código es obligatorio'),
  size: Yup.number()
    .required('El tamaño es obligatorio')
    .moreThan(0, 'El tamaño debe ser mayor que cero'),
  price: Yup.number()
    .required('El precio es obligatorio')
    .moreThan(0, 'El precio debe ser mayor que cero'),
  isAvailable: Yup.boolean().required('El estado es obligatorio'),
});

export const validationSubPropertySaleScheme = (price) => {
  return Yup.object().shape({
    onAccount: Yup.number()
      .positive('Debe ser un número positivo')
      .max(price, `El anticipo no puede ser mayor que el precio (${price})`)
      .required('El anticipo es requerido'),
    customer: Yup.object().shape({
      name: Yup.string().required('El nombre es requerido'),
      lastName: Yup.string().required('El apellido es requerido'),
      ci: Yup.string().required('El carnet de identidad es requerido'),
      phoneNumber: Yup.string().required('El numero de telefono es requerido'),
      address: Yup.object().shape({
        street: Yup.string().required('La calle es requerida'),
        reference: Yup.string().required('La referencia es requerida'),
        streetNumber: Yup.string().required('El numero de casa es requerido'),
        city: Yup.string().required('La ciudad es requerida'),
      }),
      references: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Nombre Requerido'),
          lastName: Yup.string().required('Apellido Requerido'),
          phoneNumber: Yup.string().required('Numero de Telefono Requerido'),
          relationship: Yup.string().required('Grado de parentesco Requerido'),
        })
      )
    }),
  });
};
