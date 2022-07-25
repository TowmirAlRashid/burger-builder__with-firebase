import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControl = props => {
  return (
    <div className="d-flex">
      <div style={{
        marginLeft: '20px',
        marginRight: 'auto',
        fontWeight: 'bold',
        fontSize: '1.2rem'
      }}>{props.label}</div>
      <button className="btn btn-danger btn-sm m-1" onClick={props.onRemove}>Less</button>
      <button className="btn btn-success btn-sm m-1" onClick={props.onAdd}>More</button>
    </div>
  );
}

const Controls = (props) => {
  return (
    <div className='container ml-md-5' style={{ textAlign: 'center'}}>
      <Card style={{
        marginTop: '30px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <CardHeader style={{
          backgroundColor: '#d70f64',
          color: 'white'
        }}>
          <h4>Add Some Ingredients!</h4>
        </CardHeader>
        <CardBody>
          {
            controls.map(item => {
              return <BuildControl
                label={item.label}
                type={item.type}
                key={Math.random()} 
                onAdd={() => props.addIngredient(item.type)}
                onRemove={() => props.removeIngredient(item.type)}
              />
            })
          }
        </CardBody>
        <CardFooter>
          <h5>Price: {props.price} BDT</h5>
        </CardFooter>
        <Button style={{backgroundColor: '#d70f64'}} disabled={!props.purchasable} onClick={props.toggleModal}>Place Order</Button>
      </Card>
    </div>
  )
}

export default Controls