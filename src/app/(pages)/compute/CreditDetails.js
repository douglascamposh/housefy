const CreditDetails = ({ paymentDetails }) => {
  const { 
    containerStyle, 
    tableStyle, 
    tableHeadStyle, 
    tableRowStyle, 
    bodyTableStyle, 
    elementTableStyle ,
  } = styles;

  return (
    <div className={`${containerStyle}`}>
      <table className={`${tableStyle}`}>
        <thead className={`${tableHeadStyle}`}>
          <tr>
            <th className={`${tableRowStyle}`}>#</th>
            <th className={`${tableRowStyle}`}>Fecha</th>
            <th className={`${tableRowStyle}`}>Monto Bs.</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.map((data, index) => (
            <tr
              key={index}
              className={`${bodyTableStyle}`}
            >
              <td className={`${elementTableStyle}`}>{index + 1}</td>
              <td className={`${elementTableStyle}`}>{data.item}</td>
              <td className={`${elementTableStyle}`}>{data.monthlyPayment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  containerStyle: `
    p-2
  `,
  tableStyle: `
    min-w-full 
    bg-white 
    border 
    border-gray-300 
    rounded-lg
  `,
  tableHeadStyle: `
    bg-gray-100
  `,
  tableRowStyle: `
    py-3 
    px-6 
    text-left 
    text-gray-600
  `,
  bodyTableStyle: `
    transition 
    duration-300 
    hover:bg-gray-50
  `,
  elementTableStyle: `
    py-4 
    px-6
  `,
};

export default CreditDetails;
