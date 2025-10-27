import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { HomeAbout } from '@/components/sections/HomeAbout';
import { HomeServices } from '@/components/sections/HomeServices';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { HomeCTA } from '@/components/sections/HomeCTA';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxSection } from '@/components/animations/ParallaxSection';

export const metadata: Metadata = {
  title: "Úvod",
  description: "Podlahy Zapletal - profesionální pokládka a renovace podlah v Kroměříži. Více než 20 let zkušeností. Parkety, laminát, vinyl, korkové podlahy a interiérové dveře. Kvalitní práce, fair ceny.",
  openGraph: {
    title: "Podlahy Zapletal - Pokládka podlah Kroměříž | 20 let zkušeností",
    description: "Profesionální pokládka a renovace podlah v Kroměříži a okolí. Parkety, laminát, vinyl a interiérové dveře. Kvalita a spolehlivost.",
    url: "https://podlahyzapletal.cz",
    images: [
      {
        url: "https://storage.googleapis.com/podlahy-zapletal-images/optimized/IMG_2254_1200.webp",
        width: 1200,
        height: 630,
        alt: "Podlahy Zapletal - Úvodní stránka",
      },
    ],
  },
};

export default function Home() {
  return (
    <Layout>
      <ParallaxSection offset={30}>
        <HeroSlider />
      </ParallaxSection>
      
      <ScrollReveal direction="up" delay={0.2}>
        <HomeAbout />
      </ScrollReveal>
      
      <ScrollReveal direction="up" delay={0.3}>
        <HomeServices />
      </ScrollReveal>
      
      <ScrollReveal direction="up" delay={0.4}>
        <ReviewsSection />
      </ScrollReveal>
      
      <ScrollReveal direction="up" delay={0.5}>
        <HomeCTA />
      </ScrollReveal>
    </Layout>
  );
}