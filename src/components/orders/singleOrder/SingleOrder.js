import React from 'react'

const SingleOrder = (props) => {
  let ingredientSummary = props.order.ingredients.map(item => {
    return (
      <span
        style={{
          border: "1px solid gray",
          marginRight: "10px",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {item.amount}X{" "}
        <span style={{ textTransform: "capitalize" }} key={item.type}>{item.type}</span>
      </span>
    );
  })
  return (
    <div style={{
      border: '1px solid gray',
      marginTop: '10px',
      marginBottom: '10px',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '4px 4px rgba(0, 0, 0, 0.25)'
    }}>
      <p>Order Number: {props.order.id}</p>
      <p>Delivery Address: {props.order.customerInfo.deliveryAddress}</p>
      <hr />
      {ingredientSummary}
      <hr />
      <p>Price: {props.order.price}</p>
    </div>
  )
}

export default SingleOrder