import React from 'react'

 const RenderInfoTable = ({config, obj, indexObj}) => {

    return (
        <div>
          {config.render 
            ? config.render(obj, indexObj)
            : obj[config.property]
          }
        </div>
      )
}

export default RenderInfoTable;
