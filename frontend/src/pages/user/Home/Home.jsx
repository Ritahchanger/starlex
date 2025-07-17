import Hero from "../../../components/user/Hero/Hero";
import About from "../../../components/user/About/About";
import Services from "../../../components/user/Services/Services";
import WhyChooseUs from "../../../components/user/WhyChooseUs/WhyChooseUs";
import Testmonials from "../../../components/user/Testmonials/Testmonials";
import Footer from "../../../components/user/Footer/Footer";
import WhatsApp from "../../../components/user/WhatsApp/WhatsApp";


const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Testmonials />
      <WhatsApp />
      <Footer />
    </div>
  );
};

export default Home;
