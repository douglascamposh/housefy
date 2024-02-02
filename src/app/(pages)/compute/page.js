"use client"
import { useSelector, useDispatch } from 'react-redux';
import { getTable } from '@/redux/slice/computeSlice';
import TableCompute from './TableCompute';
import CreditDetails from './CreditDetails';
import { computeFormSchema } from '@/app/utils/schema/propertySchema';
import generatePaymentDate from '@/app/utils/getDate';
import Card from '@/components/common/Card';

const Compute = () => {
  const dispatch = useDispatch();
  const paymentDetails = useSelector((state) => state.compute.data);
  const { containerStyle, tableComputeStyle, creditDetailStyle } = styles;

  const computeCredit = (data) => {
    const { total, downPayment, months, setDate } = data;
    const monthlyPayment = ((total - downPayment) / months).toFixed(2);

    const report = generatePaymentDate(setDate, months).map(item => {
      return { item, monthlyPayment }
    })
    dispatch(getTable(report));

  }

  return (
    <div className={`${containerStyle}`}>
      <div className={`${tableComputeStyle}`}>
        <TableCompute data={computeFormSchema} onSubmit={computeCredit} />
      </div>
      <div className={`${creditDetailStyle}`}>
        {
          paymentDetails.length > 0 && (
            <Card>
              <CreditDetails paymentDetails={paymentDetails} />
            </Card>
          )
        }
      </div>
    </div>
  );
}

const styles = {
  containerStyle: `
		p-10
	`,
  tableComputeStyle: `
    w-full 
    md:w-full 
    mt-4 
    md:mt-0
  `,
  creditDetailStyle: `
    w-full 
    md:w-full 
    mt-4 
    md:mt-5
  `,
};

export default Compute;
