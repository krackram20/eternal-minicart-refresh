import React, { ReactNode } from "react";
import { ExtensionPoint, useRuntime } from "vtex.render-runtime";
import { useSearchPage, useSearchPageState } from "vtex.search-page-context/SearchPageContext"

const sortByPrice = (items: any, order = 'asc') => {
  const sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;

  items.sort((a: any, b: any) =>
    sortOrder * (a.priceRange.sellingPrice.highPrice - b.priceRange.sellingPrice.highPrice)
  );

  return items;
}


interface Props {
  children: [ReactNode]
}
const CustomSort = ({ children }: Props) => {
  const { query } = useRuntime()
  const { searchQuery, showFacets, lazyItemsRemaining } = useSearchPage()
  const { mobileLayout, showContentLoader } = useSearchPageState()

  if (showContentLoader === undefined || showContentLoader) {
    return null
  }
  if (!searchQuery?.products || searchQuery?.products.lenght === 0) {
    console.log("No products found")
    return <>{children.map((child: any) => { return <>{child}</> })}</>
  }

  if (query && query.order === 'OrderByPriceASC') {
    return (
      <ExtensionPoint
        id='gallery'
        products={sortByPrice(searchQuery.products)}
        className='bn'
        mobileLayout={mobileLayout}
        showingFacets={showFacets}
        lazyItemsRemaining={lazyItemsRemaining}
      />
    )
  }
  if (query && query.order === 'OrderByPriceDESC') {
    return (
      <ExtensionPoint
        id='gallery'
        products={sortByPrice(searchQuery.products, 'desc')}
        className='bn'
        mobileLayout={mobileLayout}
        showingFacets={showFacets}
        lazyItemsRemaining={lazyItemsRemaining}
      />
    )
  }
  return (
    <ExtensionPoint
      id='gallery'
      products={searchQuery.products}
      className='bn'
      mobileLayout={mobileLayout}
      showingFacets={showFacets}
      lazyItemsRemaining={lazyItemsRemaining}
    />
  )
}

export default CustomSort
