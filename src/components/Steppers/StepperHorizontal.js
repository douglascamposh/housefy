import { MdCheck,MdPriorityHigh } from "react-icons/md";
const StepperHorizontal=(params)=> {
    const steps=params.steps;
    const page=params.page;
    const activeStep=page;
    return (
        <div className="p-5">
            <div className="mx-4 mb-[60px] p-4">
                <div className="flex items-center">
                    {
                        steps.map((step,index)=>(
                            (activeStep>index ?
                                <>
                                    {
                                        step.status?
                                        <div key={index} className="flex items-center text-green-600 relative">
                                            <div  className="pl-[10px] rounded-full transition duration-500 ease-in-out h-12 w-12 py-3  border-green-600 bg-green-200 cursor-pointer" onClick={()=>params.modifiedPage(index)}>
                                                <MdCheck className='text-2xl'/>
                                            </div>
                                            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-green-600">{step.title} </div>
                                        </div> 
                                    :
                                        <div key={index} className="flex items-center text-yellow-600 relative">
                                            <div  className="pl-[10px] rounded-full transition duration-500 ease-in-out h-12 w-12 py-3  border-yellow-600 bg-yellow-100 cursor-pointer" onClick={()=>params.modifiedPage(index)}>
                                                <MdPriorityHigh className='text-2xl'/>
                                            </div>
                                            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-yellow-600">{step.title}</div>
                                        </div> 
                                    }
                                    {index+1<steps.length&&
                                        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-green-600"></div>
                                    }
                                </>
                                :
                                (activeStep==index ?
                                    <>
                                    <div  className="flex items-center text-white relative" >
                                        <div className="pl-[10px] rounded-full justify-center items-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-green-600 border-green-600 cursor-pointer" onClick={()=>params.modifiedPage(index)}>
                                            {step.icon}
                                        </div>
                                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">{step.title}</div>
                                    </div>
                                    {
                                        index+1!=steps.length&&
                                        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                                    }                                    
                                </>:
                                    <>
                                        <div className="flex items-center text-gray-500 relative" >
                                            <div className="pl-[10px] rounded-full justify-center items-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300 cursor-pointer" onClick={()=>params.modifiedPage(index)}>
                                                {step.icon}
                                            </div>
                                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">{step.title}</div>
                                        </div>
                                            {
                                                index+1!=steps.length&&
                                                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                                            }                                    
                                    </>
                                )
                            )
                        ))
                    }
                </div>
            </div>
            {steps[activeStep] && steps[activeStep].content}
        </div>
    )
}
export default StepperHorizontal