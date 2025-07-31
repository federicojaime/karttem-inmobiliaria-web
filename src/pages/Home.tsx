// src/pages/Home.tsx
import { Hero } from '../components/home/Hero';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { AboutUs } from '../components/home/AboutUs';
//import { Demo360Property } from '../components/demo/Demo360Property';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ContactCTA } from '../components/home/ContactCTA';
import { PropertiesMapSection } from '../components/home/PropertiesMapSection';

export const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <AboutUs />
      <PropertiesMapSection />
      <WhyChooseUs />
      <ContactCTA />
    </div>
  );
};