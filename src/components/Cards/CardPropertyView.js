import React from "react";
import CardProperty from "./CardProperty";

const CardView = ({ data }) => {
  return (
    <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
      {data.map((item, key) => (
        (item.name && item.address?.street) ? (
          <CardProperty
            key={item.id}
            name={item.name}
            id={item.id}
            images={item.images}
            description={item.description}
            address={item.address.street}
            propertiesAvailable={item.subProperties.length}
          />
        ) : null
      ))}
    </div>
  );
};

export default CardView;
