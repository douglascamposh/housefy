import React from "react";
import Card from "./Card";

const CardView = ({ data }) => {
  return (
    <div className="grid gap-2 lg:grid-cols-4">
      {data.map((item, key) => (
        (item.name && item.address?.street) ? (
          <Card
            key={key}
            name={item.name}
            images={item.images}
            description={item.description}
            address={item.address.street}
          />
        ) : null
      ))}
    </div>
  );
};

export default CardView;
