import './App.css';
import Header from './components/Header/Header';
import MainBanner from './components/MainBanner/MainBanner';
import FeaturedSection from './components/FeaturesSection/FeaturesSection';
import CaseStudies from './components/CaseStudies/CaseStudies';
import Quote from './components/Quote/Quote';
import Services from './components/Services/Services';
import FunFacts from './components/FunFacts/FunFacts';
import PricingArea from './components/PricingArea.jsx/PricingArea';
import Cta from './components/CTA/Cta';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import GoTotop from './components/GoToTop/GoToTop';
import AppRouter from './Router/AppRouter';


function App() {
  return (
    <body>
      <AppRouter/>
    </body>
  );
}

export default App;
