import Hero from "../../../components/user/Hero/Hero";
import About from "../../../components/user/About/About";
import Services from "../../../components/user/Services/Services";
import WhyChooseUs from "../../../components/user/WhyChooseUs/WhyChooseUs";
import Testmonials from "../../../components/user/Testmonials/Testmonials";
import Footer from "../../../components/user/Footer/Footer";
import WhatsApp from "../../../components/user/WhatsApp/WhatsApp";
import ContactModal from "../../../components/user/Contact/Contact";

import QuotationModal from "../../../components/user/GetQuotation/GetQuotation";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Testmonials />
      <WhatsApp />
      <ContactModal />
      <QuotationModal />
      <Footer />
    </div>
  );
};

export default Home;
