import React ,{useState,useEffect}from 'react';

import Helmet from '../components/Helmet/Helmet';
import heroImg from '../assets/images/hero-img.png';
import { Container,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import '../styles/home.css'
import Services from '../services/Services';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';
const Home = () => {
  const [data,setData]= useState(products);
  const year = new Date().getFullYear();

  useEffect(()=>{
    const filterProducts = products.filter(item=>
      item.category ==='chair');
      setData(filterProducts);
  },[]);
  return (
    <Helmet title={'Home'}>
    <section className='hero__section'>
    <Container>
      <Row>
        <Col lg='6' md='6'>
          <div className="hero__content">
            <p className="hero__subtitle">Trending product in {year}</p>
            <h2>Make Your Interior More Min & Modern</h2>
            <p>Welcome Hello Baby</p>
            <motion.button whileTap={{scale:1.2}} className="buy__btn" ><Link to='/shop'>SHOP NOW</Link></motion.button>
          </div>
        </Col>

        <Col lg='6' md='6'>
          <div className="hero__img">
             <img src={heroImg} alt=''></img>
          </div>
        </Col>
      </Row>
    </Container>
    </section>
   <Services></Services>

   {/* !--Trending Products--! */}
   <section className="trending__products">
    <Container>
      <Row>
        <Col lg='12' className='text-center'>
          <h2 className="section__title">Trending Products</h2>
        </Col>
       <ProductsList data={data}/>
      </Row>
    </Container>
   </section>
    </Helmet>
  )
}

export default Home