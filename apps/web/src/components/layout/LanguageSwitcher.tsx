import type { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import type { Language } from '@/lib/types';
import { saveLanguage } from '@/lib/languageStore';

/**
 * Language switcher component
 * Allows users to switch between Romanian and English
 */
export const LanguageSwitcher: FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLang: Language) => {
    if (newLang === language) return;

    // Update language in context and localStorage
    setLanguage(newLang);
    saveLanguage(newLang);

    // Update URL to reflect new language
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(ro|en)/, '');
    const newPath = `/${newLang}${pathWithoutLang || '/'}`;
    
    navigate(newPath, { replace: true });
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'ro', label: 'RO' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div className="flex items-center gap-1" role="group" aria-label={t('language.switch')}>
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleLanguageChange(code)}
          className={`px-2 py-1 text-sm font-medium rounded transition-colors duration-200 ${
            language === code
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:bg-surface-hover'
          }`}
          aria-pressed={language === code}
          title={t(`language.${code}`)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
