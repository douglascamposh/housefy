import { MdModeEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import { useDeleteSubPropertiesMutation } from "@/redux/services/propertiesApi";
import { toast } from "react-toastify";
import { Logger } from "@/services/Logger";
import ConfirmationDialog from "./ConfirmationDialog";
import { FaCalendar, FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
const DetailsSubProperty = (params) => {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [deleteSubProperty] = useDeleteSubPropertiesMutation();

  const dataSubProperty = params.dataSubproperty;
  const handleDeleteSubProperty = async () => {
    if (
      !dataSubProperty ||
      !dataSubProperty.id ||
      !dataSubProperty.propertyId
    ) {
      Logger.error("Los valores de id o propertyId son inválidos.");
      return;
    }
    setIsConfirmationDialogOpen(true);
  };
  const handleCancelDelete = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmationDialogOpen(false);
    const id = dataSubProperty.id;
    const PropertyId = dataSubProperty.propertyId;

    try {
      const response = await deleteSubProperty({ id: PropertyId, subId: id });
      if (response.error) {
        toast.error("Esta subpropiedad no puede ser eliminada");
      } else {
        toast.success("Se eliminó correctamente la subpropiedad");
        params.onClose();
      }
    } catch (error) {
      Logger.error("Error al eliminar la subpropiedad ", error);
    }
  };

  return (
    <div className="sm:w-96 bg-white rounded-lg shadow-2xl sm:p-6 p-2 h-auto ">
      <div className="flex justify-between">
        {!dataSubProperty.commonArea && (
          <div className="flex items-center">
            <p className="font-bold text-3xl"> {dataSubProperty.price} US$</p>
            {dataSubProperty.isAvailable ? (
              <p className="text-sm text-gray-500">Disponible</p>
            ) : dataSubProperty.status == "SOLD" ? (
              <p className="text-sm text-gray-500">Vendida</p>
            ) : (
              <p className="text-sm text-gray-500">Reservada</p>
            )}
          </div>
        )}
        {dataSubProperty.commonArea && (
          <p className="font-bold text-3xl"> {dataSubProperty.code} </p>
        )}
        {(dataSubProperty.isAvailable || dataSubProperty.commonArea) && (
          <div className="flex">
            <button
              onClick={() => {
                params.toggleFormSubProperty();
              }}
              className="w-8 h-8 bg-white mt-[-7px] text-gray-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <MdModeEdit size={15} />
            </button>
            <button
              onClick={handleDeleteSubProperty}
              className="w-8 h-8 bg-white mt-[-7px] text-gray-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <MdDelete size={15} />
            </button>
          </div>
        )}
      </div>

      {dataSubProperty.status == "RESERVED" && (
        <div className="text-red-500 flex items-center">
          <FaCalendar className="mr-2"></FaCalendar>
          <p>
            ¡Esta reserva expira en
            <b>
              {" " +
                Math.floor(
                  (new Date(dataSubProperty.reservationExpiresDate * 1000) -
                    new Date()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
              dias!
            </b>
          </p>
        </div>
      )}
      {dataSubProperty.commonArea ? (
        <div className="mt-5 font-semibold">Area común:</div>
      ) : (
        <div className="mt-5 font-semibold">Detalle de propiedad:</div>
      )}
      {!dataSubProperty.commonArea && (
        <div className="flex justify-between">
          <p className="text-gray-700">Codigo: </p>
          <p>{dataSubProperty.code}</p>
        </div>
      )}
      <div className="flex justify-between">
        <p className="text-gray-700">Tamaño: </p>
        <p>{dataSubProperty.size} m²</p>
        {dataSubProperty.commonArea ? "es" : "no es"}
      </div>
      {!dataSubProperty.isAvailable ? (
        !dataSubProperty.commonArea && (
          <>
            <div>
              <label className="font-semibold">
                Propiedad
                {dataSubProperty.status == "SOLD" ? " vendida" : " reservada"}
              </label>
              <div className="flex justify-between">
                <p className="text-gray-700">Pago Anticipo: </p>
                <p>{dataSubProperty.onAccount} US$</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Por pagar: </p>
                <p>{dataSubProperty.balance} US$</p>
              </div>
            </div>
            <div>
              <label className="font-semibold">Datos del cliente</label>
              <div className="flex justify-between">
                <p className="text-gray-700">Nombres: </p>
                <p>
                  {dataSubProperty.customer.name}{" "}
                  {dataSubProperty.customer.lastName}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Telefono: </p>
                <div className=" ">{dataSubProperty.customer.phoneNumber}</div>
              </div>
              {dataSubProperty.status == "RESERVED" && (
                <div className="flex justify-between">
                  <Link
                    className="text-blue-600 hover:text-blue-400 font-semibold mt-5 flex items-center"
                    href={
                      "https://api.whatsapp.com/send?phone=591" +
                      dataSubProperty.customer.phoneNumber
                    }
                  >
                    <FaPhoneAlt className="mr-2"></FaPhoneAlt>
                    Contactar cliente
                  </Link>
                  <Link
                    className="text-green-600 hover:text-green-400 font-semibold mt-5 flex items-center"
                    href={`/properties/details/${params.id}/subproperties/sale/${dataSubProperty.id}`}
                  >
                    <FaShoppingCart className="mr-2"></FaShoppingCart>
                    Realizar venta
                  </Link>
                </div>
              )}
            </div>
          </>
        )
      ) : (
        <div>
          <Link
            href={`/properties/details/${params.id}/subproperties/reserve/${dataSubProperty.id}`}
          >
            <div className="bg-primary w-full text-center text-white font-semibold py-2 mt-2 hover:bg-orange-600 hover:cursor-pointer">
              Reservar
            </div>
          </Link>
          <Link
            href={`/properties/details/${params.id}/subproperties/sale/${dataSubProperty.id}`}
          >
            <div className="border border-primary w-full text-center text-primary font-semibold py-2 mt-2 hover:bg-gray-100 hover:cursor-pointer">
              Vender ahora
            </div>
          </Link>
        </div>
      )}
      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        content="¿Estas seguro que deseas eliminar esta sub propiedad?"
      />
    </div>
  );
};
export default DetailsSubProperty;
