import { FaWater, FaBolt, FaWifi, FaGasPump } from "react-icons/fa";
import PageRoles from "../(pages)/roles/page";
import Users from "@/components/Users/Users";

export const cities = [
  "Pando",
  "Beni",
  "Cochabamba",
  "La Paz",
  "Oruro",
  "Potosí",
  "Santa Cruz",
  "Tarija",
  "Sucre",
];
export const serviceOptions = {
  "Agua potable": <FaWater />,
  "Energía eléctrica": <FaBolt />,
  "Telefonía/internet": <FaWifi />,
  Gas: <FaGasPump />,
};
export const sale_status = {
  sold: "SOLD",
  reserved: "RESERVED",
};

export const headersMappingSaleman = [
  { key: "name", text: "Nombre" },
  { key: "lastName", text: "Apellido" },
  { key: "phoneNumber", text: "Telefono" },
];

export const routes = {
  propiedades: '/properties',
  roles: '/roles',
  vendedores: '/saleman',
  ventas: '/sales'
};

export const methods = {
  read: "GET",
  create: "POST",
  update: "PUT",
  delete: "DELETE",
};

export const ConfigurationItems = [
  { label: "General" },
  { label: "Apariencia" },
  { label: "Roles y accesos" },
  { label: "Seguridad" },
  { label: "Usuarios"}
];

export const contentConfiguration = {
  "Roles y accesos": <PageRoles />,
  "Usuarios": <Users/>
};
