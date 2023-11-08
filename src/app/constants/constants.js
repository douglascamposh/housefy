import { FaWater, FaBolt, FaWifi, FaGasPump } from "react-icons/fa";
import PageRoles from "../(pages)/roles/page";
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
  properties: "/properties",
};

export const methods = {
  get: "GET",
  post: "POST",
  update: "UPDATE",
  delete: "DELETE",
};

export const ConfigurationItems = [
  { label: "General" },
  { label: "Apariencia" },
  { label: "Roles y accesos" },
  { label: "Seguridad" },
];

export const contentConfiguration = {
  "Roles y accesos": <PageRoles />,
};
