export const updateManualPrice = async (items: any[], isLoggedIn: boolean, orderFormId: string) => {
  // if ( items.length === 0 || items.every((item) => item?.manualPrice === null)) {
  //   return []
  // }

  console.log(isLoggedIn)
  if ( items.length === 0) {
      return []
    }

  return Promise.all(items.map(async (_: any, index: number) => {
    const res = await fetch(`/api/checkout/pub/orderForm/${orderFormId}/items/update`, {
      method: 'POST',
      // headers: {
      //  ADD CREDENTIALS IF NEEDED
      // },
      body: JSON.stringify({
        orderItems: [{
          index,
          price: null
        }]
      })
    })

    return res
  }))
}
