import React, { useEffect, useState } from 'react'
import Itmes from './Items'
import Cart from './Cart'
// import axios from 'axios'
const AddToProduct = 'product';
const SelectedProduct = 'cart'

const Product = () => {

   const [cart, setcart] = useState([])

   useEffect(() => {

      const requestOptions = {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify()
      };
      fetch('/data', requestOptions)
         .then(response => response.json())
         .then((data) => {
            setcart(data);
         });

   }, [])



   const [page, setPage] = useState(AddToProduct)

   const navigate = (nextpage) => {
      setPage(nextpage)
   }

   const removeFromCart = (removeProduct) => {
      const requestOptions = {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(removeProduct)
      };
      fetch('/removeItem', requestOptions)
         .then(response => response.json());
      console.log(removeProduct);
      setcart(cart.filter((product) => product !== removeProduct))
   }

   const deleteAll = () => {
      const requestOptions = {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify()
      };
      fetch('/clearItem', requestOptions)
         .then(response => response.json());
      setcart([]);
   }


   const addToCart = (product) => {
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(product)
      };
      fetch('/addItem', requestOptions)
         .then(response => response.json())
         .then(data => setcart([...cart, { ...data }]));
      console.log('add to cart');
      // setcart([...cart,{...product}])
   }

   return (
      <>
         {/* <Navbar/> */}
         <header>
            <h3 onClick={() => navigate(AddToProduct)} style={{cursor:"pointer"}}>Food Ordering Portal</h3>
            <i class="fa fa-shopping-cart cartIcon" onClick={() => navigate(SelectedProduct)}>  {cart.length}</i>
         </header>
         {page === AddToProduct && (<Itmes addToCart={addToCart} />)}
         {page === SelectedProduct && (<Cart cart={cart} deleteAll={deleteAll} removeFromCart={removeFromCart} />)}

      </>
   )
}

export default Product;
