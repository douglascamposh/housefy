"use client";
import Button from "@/components/Form/Button";
import CustomerForm from "@/components/Form/CustomerForm";
import StepperHorizontal from "@/components/Steppers/StepperHorizontal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAccountBox, MdShoppingCart } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setSaleData } from "@/redux/actions";
import { subPropertySaleScheme } from "@/app/utils/schema/propertySchema";
import PayForm from "@/components/Form/PayForm";
import { useGetSubPropertiesQuery } from "@/redux/services/propertiesApi";
import Spinner from "@/components/Spinner";
import { Logger } from "@/services/Logger";
import { sale_status } from "@/app/constants/constants";
import { useCreateSalePropertyMutation } from "@/redux/services/propertiesApi";
import { useRouter } from "next/navigation";
import HeaderSale from "@/components/Headers/HeaderSale";
const Page = ({ params }) => {
  const router = useRouter();
  const { data, error, isLoading } = useGetSubPropertiesQuery(
    String(params.id)
  );
  const [createSale] = useCreateSalePropertyMutation();
  const subPropertiesArray = data ? data : [];
  const action = params.action;
  const subPropertyInfo = subPropertiesArray.find(
    (object) => object.id === params.idSubproperty
  );
  let saleData = useSelector((state) => state.rootReducer.saleData);
  const dispatch = useDispatch();
  const handleCreateSales = async (dataSale) => {
    try {
      const response = await createSale(dataSale);
      if (!response.error) {
        const successMessage =
          action === "reserve"
            ? "Propiedad reservada exitosamente"
            : "Propiedad vendida exitosamente";
        toast.success(successMessage);
        router.push(`/properties/details/${params.id}/subproperties`);
      } else {
        Logger.error("An error occurred at create sale: ", response.error);
        toast.error("No se pudo realizar la venta de la propiedad");
      }
    } catch (error) {
      Logger.error("An error occurred at create sale: ", error);
    }
  };
  const modifiedPage = (nroPage) => {
    setPage(nroPage);
  };
  const [page, setPage] = useState(0);
  const validateData = () => {
    if (saleData.customer.ci == "") {
      setSteps((prevSteps) => {
        const updatedSteps = [...prevSteps];
        updatedSteps[0].status = false;
        return updatedSteps;
      });
    } else {
      setSteps((prevSteps) => {
        const updatedSteps = [...prevSteps];
        updatedSteps[0].status = true;
        return updatedSteps;
      });
    }
  };
  const MakeSale = async () => {
    let dataCopy = { ...saleData };
    dataCopy.propertyId = params.id;
    dataCopy.subPropertyId = params.idSubproperty;
    dataCopy.status =
      action === "sale" ? sale_status.sold : sale_status.reserved;
    await handleCreateSales(dataCopy);
  };
  const [steps, setSteps] = useState([
    {
      icon: <MdAccountBox className="text-2xl" />,
      title: "Información del cliente",
      content: <CustomerForm modifiedPage={modifiedPage} />,
      status: true,
    },
    {
      icon: <MdShoppingCart className="text-2xl" />,
      title: "Detalle de pago",
      content: (
        <PayForm
          subPropertyInfo={subPropertyInfo}
          modifiedPage={modifiedPage}
        />
      ),
      status: true,
    },
  ]);
  // Only runs when the component is mounted and unmounted
  useEffect(() => {
    return () => {
      dispatch(setSaleData(subPropertySaleScheme));
    };
  }, []);

  useEffect(() => {
    validateData();
  }, [page, saleData]);
  useEffect(() => {
    if (subPropertyInfo) {
      setSteps((prevSteps) => {
        const updatedSteps = [...prevSteps];
        updatedSteps[1].content = (
          <PayForm
            subPropertyInfo={subPropertyInfo}
            modifiedPage={modifiedPage}
            size={steps.length}
          />
        );
        return updatedSteps;
      });
    }
  }, [subPropertyInfo]);
  if (subPropertyInfo && !subPropertyInfo.isAvailable) {
    return (
      <div className="justify-center flex items-center h-screen ">
        <Spinner></Spinner>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="justify-center flex items-center h-screen ">
        <Spinner></Spinner>
      </div>
    );
  }
  return (
    <>
      <HeaderSale id={params.id}></HeaderSale>
      <div className="flex flex-col sm:flex-row h-screen m-[-10px]">
        <div className="w-full sm:w-[55%] sm:ml-10 sm:p-10 text-black sm:overflow-auto">
          <div className="flex justify-between items-center mx-4">
            <h1 className="text-2xl sm:text-xl xl:text-2xl font-bold">
              Detalle de la {action === "reserve" ? "reserva" : "venta"}:
            </h1>
          </div>
          <StepperHorizontal
            steps={steps}
            page={page}
            modifiedPage={modifiedPage}
          ></StepperHorizontal>
          {subPropertyInfo && (
            <div className="mx-4">
              <h1 className="text-2xl sm:text-xl xl:text-2xl font-bold">
                Detalles de la propiedad
              </h1>
              <div className="flex justify-between mt-3">
                <div>
                  <p className="text-gray-700 font-bold">
                    {subPropertyInfo.code}{" "}
                  </p>
                  <p className="text-gray-700">{subPropertyInfo.size} m² </p>
                </div>
                <p>{subPropertyInfo.price} US$</p>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-100 w-full sm:w-[45%] p-10 flex items-center justify-center">
          <div className="w-full sm:w-[400px]">
            <h1 className="font-bold text-2xl sm:text-xl mb-2 xl:text-2xl">
              Resumen
            </h1>
            {saleData.customer.name != "" && (
              <div className="flex justify-between">
                <p className="text-gray-700">Cliente: </p>
                <p>
                  {saleData.customer.name} {saleData.customer.lastName}{" "}
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <p className="text-gray-700">Precio total: </p>
              <p>{subPropertyInfo.price} US$</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Anticipo: </p>
              <p>{saleData.onAccount} US$</p>
            </div>
            <div className="h-[1px] bg-gray-400 mt-3 mb-5"></div>
            <div className="flex justify-between font-bold">
              <p className="text-gray-700">Saldo pendiente: </p>
              <p>{subPropertyInfo.price - saleData.onAccount} US$</p>
            </div>
            <br />
            <small className="text-gray-400">
              Al completar la venta, aceptas estas Condiciones de uso.
            </small>
            <Button
              label={
                action === "reserve" ? "Realizar reserva" : "Realizar venta"
              }
              className="w-full"
              onClick={MakeSale}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
