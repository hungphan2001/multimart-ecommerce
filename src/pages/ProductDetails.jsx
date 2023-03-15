import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import products from '../assets/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import '../styles/product-details.css';
import { motion } from 'framer-motion';

import { db } from '../firebase-config'
import { doc, getDoc } from 'firebase/firestore'

import useGetData from '../custom-hooks/useGetData';
const ProductDetails = () => {

  const [product, setProduct] = useState({})
  const [tab, setTab] = useState('decs')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')

  const dispatch = useDispatch()
  const [rating, setRating] = useState(null)
  const { id } = useParams()

  const { data: products } = useGetData('products')
  //const product = products.find(item => item.id === id)
  const docRef = doc(db, 'products', id)

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setProduct(docSnap.data())
      } else {
        console.log('no product')
      }
    }
    getProduct()
  }, [])
  const { imgUrl, productName, category, price, 
    //avgRating, 
    //reviews, 
    description, shortDesc } = product;
  const relatedProducts = products.filter(item => item.category === category)

  const submitHander = (e) => {
    e.preventDefault()

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObj);
    toast.success('Review submitted');
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price,
    }))
    toast.success('Product added successfully');
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  return <Helmet title={productName}>
    <CommonSection title={productName}></CommonSection>
    <section className='pt-0'>
      <Container>
        <Row>
          <Col lg='6'>
            <img src={imgUrl} alt='' />
          </Col>

          <Col lg='6'>
            <div className="product__details">
              <h2>{productName}</h2>
              <div className="product__rating d-flex align-items-center gap-5 md-3">
                <div>
                  <span>
                    <i class="ri-star-s-fill"></i></span>
                  <span>
                    <i class="ri-star-s-fill"></i></span>
                  <span>
                    <i class="ri-star-s-fill"></i></span>
                  <span>
                    <i class="ri-star-s-fill"></i></span>
                  <span>
                    <i class="ri-star-half-s-line"></i></span>
                </div>
                {/* <p>(<span>{avgRating}</span> ratings)</p> */}
              </div>
              <div>
                <span className='product__price d-flex align-items-center gap-5'>$ {price}</span>
                <span>Category : {category}</span>
              </div>
              <p className='mt-3'>{shortDesc}</p>
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn" onClick={addToCart}>Add to Cart</motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <div className="tab__wrapper d-flex align-items-center gap-5">
              <h6 className={`${tab === 'decs' ? 'active__tab' : ''}`}
                onClick={() => setTab('decs')}>Description</h6>
              <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`}
                onClick={() => setTab('rev')}>
                  {/* Reviews ({reviews.length}) */}
                  </h6>
            </div>

            {
              tab === 'decs' ? <div className="tab__content mt-5">
                <p>{description}</p>
              </div> : (<div className='product__review mt-5'>
                <div className="review__wrapper">
                  {/* <ul>
                    {
                      reviews?.map((item, index) => (
                        <li key={index} className='mb-4'>
                          <h6>Hung Phan</h6>
                          <span>{item.rating} ( rating)</span>
                          <p>{item.text}</p></li>
                      ))
                    }
                  </ul> */}
                  <div className="review__form">
                    <h4>Leave ypur experience</h4>
                    <form action="" onSubmit={submitHander}>
                      <div className="form__group">
                        <input type="text"
                          placeholder='Enter name'
                          ref={reviewUser}
                          required />
                      </div>
                      <div className="form__group d-flex align-items-center gap-5 rating__group">
                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i class="ri-star-s-fill"></i></motion.span>
                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i class="ri-star-s-fill"></i></motion.span>
                      </div>

                      <div className="form__group">
                        <textarea ref={reviewMsg}
                          rows={4} type="text"
                          placeholder='Review Mess'
                          required />
                      </div>
                      <motion.button whileTap={{ scale: 1.2 }}
                        type='submit' className="buy__btn">Submit</motion.button>
                    </form>
                  </div>
                </div>
              </div>
              )}
          </Col>

          <Col lg='12' className='mt-5'>
            <h2 className="related__title ">You might also like</h2>
          </Col>
          <ProductsList data={relatedProducts}/>

        </Row>
      </Container>
    </section>


  </Helmet>
};

export default ProductDetails