const Card = ({ children }) => {
	const { containerStyle } = styles;
	return (
		<div className={`${containerStyle}`}>
			{children}
		</div>
  );
};

const styles = {
	containerStyle: `
		m-1
		bg-white
		rounded-lg 
		shadow-xl
	`
};

export default Card;