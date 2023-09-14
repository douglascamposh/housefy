import { MdModeEdit,MdShoppingCart } from "react-icons/md";
import { useState } from "react";
import FormSale from "./Form/FormSale";

const DetailsSubProperty=(params,toggleFormSubProperty)=>{
    const [formSale, setFormSale] = useState(false);


    const toggleSaleForm=()=>{
        setFormSale(!formSale)
    }
    const dataSubProperty=params.dataSubproperty
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
                <button onClick={()=>toggleFormSubProperty} className="w-8 h-8 bg-white mt-[-7px] text-gray-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg">
                    <MdModeEdit size={15} />
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
                    <FormSale idProperty={params.id} idSubProperty={dataSubProperty.id} price={dataSubProperty.price} onClose={toggleSaleForm}></FormSale>
                    :
                    <button onClick={()=>setFormSale(!formSale)} className="text-blue-400 flex mt-20 w-full text-center">
                        <MdShoppingCart></MdShoppingCart>
                         Realizar venta
                    </button>
                )
                

            }
        </div>
    )

}
export default DetailsSubProperty