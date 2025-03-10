// src/pages/Home.tsx
import { Hero } from '../components/home/Hero';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ContactCTA } from '../components/home/ContactCTA';

export const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <ContactCTA />
    </div>
  );
};