const DropdownMenu = ({ dataDropdownList, textDropdown }) => {
  return (
    <div className="relative group">
      <button className="text-black shadow px-4 py-2 hover:text-primary">{textDropdown}</button>
      <div className="absolute hidden left-[-50px] group-hover:block bg-white shadow-lg ">
          <ul>
            {dataDropdownList.map((item, index) => {
              return (
                <li key={index}>
                  {item}
                </li>
              )
            })}
          </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;