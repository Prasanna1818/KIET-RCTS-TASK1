import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import SecondFooter from '../../components/Footer/SecondFooter';


function Page() {
    return (
      <div className="App">
        <Navbar />
        <Content />
        <Footer />
        <SecondFooter />
      </div>
    );
  }
  
  export default Page;
  