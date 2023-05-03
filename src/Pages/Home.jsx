import Hero from '../components/Hero';
import BookCar from '../components/BookCar';
import PlanTrip from '../components/PlanTrip';
import PickCar from '../components/PickCar';
import Banner from '../components/Banner';
import ChooseUs from '../components/ChooseUs';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import Download from '../components/Download';
import Footer from '../components/Footer';
import Models from './Models';
import CarList from './CarList';
import HomeScreen from './HomeScreen';
import FrequentlyRentedCars from './FrequentlyRentedCars';
import NotRentedCars from './NotRentedCars';

function Home() {
  return (
    <>
      <Hero />
      {/* <BookCar /> */}
      <PlanTrip />
      <HomeScreen />
      <NotRentedCars />
      <FrequentlyRentedCars />
      {/* <PickCar /> */}
      {/* <Banner />
      <ChooseUs />
      <Testimonials />
      <Faq />
      <Download /> */}
      {/* <Footer /> */}
    </>
  );
}

export default Home;
