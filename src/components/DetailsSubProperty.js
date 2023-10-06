import { MdModeEdit,MdShoppingCart,MdDelete } from "react-icons/md";
import { useState } from "react";
import FormSale from "./Form/FormSale";
import { useDeleteSubPropertiesMutation } from "@/redux/services/propertiesApi";
import { toast } from "react-toastify";
import { Logger } from "@/services/Logger";
import ConfirmationDialog from "./ConfirmationDialog";
import AutoCompleteCustomer from "./AutoCompleteCustomer";
const DetailsSubProperty=(params)=>{
    const [formSale, setFormSale] = useState(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [deleteSubProperty] = useDeleteSubPropertiesMutation();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const handleSelectCustomer = (value) => {
        setSelectedCustomer(value);
    };
    const toggleSaleForm=()=>{
        setFormSale(!formSale)
    }
    const dataSubProperty=params.dataSubproperty
    const handleDeleteSubProperty = async () => {
        if (!dataSubProperty || !dataSubProperty.id || !dataSubProperty.propertyId) {
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
        <div className="w-96 bg-white rounded-lg shadow-2xl p-6 h-auto ">
            <div className="flex justify-between">
                <div className="flex items-end">
                    <p className="font-bold text-2xl">
                        $ {dataSubProperty.price} USD
                    </p>
                    {dataSubProperty.isAvailable?
                        <p className="text-sm">
                            Disponible
                        </p>
                        :
                        <p className="text-sm">
                            No disponible
                        </p>
                    }

                </div>
                <button onClick={()=>{params.toggleFormSubProperty()}} className="w-8 h-8 bg-white mt-[-7px] text-gray-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg">
                    <MdModeEdit size={15} />
                </button>
                <button onClick={handleDeleteSubProperty} className="w-8 h-8 bg-white mt-[-7px] text-gray-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg">
                    <MdDelete size={15} />
                </button>
            </div>

            <div className="mt-5 font-semibold">Detalle de propiedad:</div>
            <div className="flex justify-between">
                <p className="text-gray-700">Codigo: </p>
                <p>{dataSubProperty.code}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-700">Tamaño: </p>
                <p>{dataSubProperty.size} m²</p>
            </div>
            {   dataSubProperty.isAvailable!=true?
                <div>
                    <label className="font-semibold">
                        Propiedad vendida
                    </label>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Pago Anticipo: </p>
                        <p>{dataSubProperty.onAccount}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Por pagar: </p>
                        <p>{dataSubProperty.balance}</p>
                    </div>
                </div>:
                (
                formSale?
                    <>
                        <label className='font-bold'>Buscar cliente:</label>
                        <AutoCompleteCustomer onSelect={handleSelectCustomer} />
                        <FormSale idProperty={params.id} idSubProperty={dataSubProperty.id} price={dataSubProperty.price} onClose={toggleSaleForm} selectedCustomer={selectedCustomer}></FormSale>

                    </>
                    :
                    <button onClick={()=>setFormSale(!formSale)} className="text-blue-400 flex mt-20 w-full text-center">
                        <MdShoppingCart></MdShoppingCart>
                         Realizar venta
                    </button>
                )
                

            }
            <ConfirmationDialog
                isOpen={isConfirmationDialogOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                content="¿Estas seguro que deseas eliminar esta sub propiedad?"
            />
        </div>
    )

}
export default DetailsSubProperty