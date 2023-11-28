import React, { useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { updateManualPrice } from './utils'

const RefreshOrderForm = () => {
  const { orderForm: { items } } = useOrderForm()
  if (items && items.length > 0) {
    return (<ExecuteUpdate />)
  }

  return (<></>)
}

const ExecuteUpdate = () => {
  const { orderForm: { items, id, loggedIn } } = useOrderForm()
  const { addItems } = useOrderItems()

  useEffect(() => {
    if (items.length > 0) {
      setTimeout(async () => {
        await updateManualPrice(items, loggedIn, id)
        await addItems([
          {
            id: items[0].id,
            seller: items[0].seller,
            quantity: 0, price: null
          }
        ])
      }, 200)

    }

  }, [id])

  return (<></>)
}

export default RefreshOrderForm
