import { useEffect, useState } from "react"
import Articles from "./Components/Articles"
import Header from "./Components/Header"
import { db } from "./data/db"


function Home() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const MAX_ITEM = 5
  const MIN_ITEM = 1

  function addToCart(item) {
    const itemExists = cart.findIndex(article => article.id === item.id)
    if(itemExists >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(article => article.id !== id))

  }

  function increaseQuantity(id) {
    const updatedcart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedcart)
  }

  function decreaseQuantity(id) {
    const updatedcart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEM) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedcart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>

    <Header
    cart={cart}
    removeFromCart={removeFromCart} 
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
              <Articles key={item.id}
              articles={item}
              addToCart={addToCart}/>
          ))}
         
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default Home
