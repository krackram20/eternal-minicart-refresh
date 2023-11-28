import React, { useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'

const RefreshOrderForm = () => {
  const { orderForm: { items, id } } = useOrderForm()
  const { addItems } = useOrderItems()

  useEffect(() => {
    if (items.length > 0) {
      addItems([
        {
          id: items[0].id, seller: items[0].seller, quantity: 0
        }
      ])
    }

  }, [id])

  return (<></>)
}

export default RefreshOrderForm