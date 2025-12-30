import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ArduinoHomeCard } from '@/components/common';
import type { Language } from '@/lib/types';

/**
 * Home page component
 * Landing page with Arduino-themed hero card
 */
export const HomePage: FC = () => {
  const { language } = useLanguage();
  const params = useParams<{ lang: string }>();
  const currentLang = (params.lang as Language) || language;

  return (
    <div className="py-8 md:py-12">
      <ArduinoHomeCard language={currentLang} />
    </div>
  );
};

export default HomePage;
