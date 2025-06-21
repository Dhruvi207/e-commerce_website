import React, { useRef } from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import NewCollections from '../components/NewCollections/NewCollections'

const Shop = () => {
  const newCollectionRef = useRef(null)

  const scrollToNewCollections = () => {
    newCollectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Hero onScrollToNew={scrollToNewCollections} />
      <Popular />
      <div ref={newCollectionRef}>
        <NewCollections />
      </div>
    </div>
  )
}

export default Shop
