import React from 'react'

const Summary = (props) => {
  const ingredientSummary = props.ingredients.map(item => {
    return (
      <li key={item.type}>
        <span style={{textTransform: 'capitalize'}}>{item.type}: {item.amount}</span>
      </li>
    )
  })
  return (
    <div>
      <ul style={{listStyle: 'none'}}>
        {ingredientSummary}
      </ul>
    </div>
  )
}

export default Summary