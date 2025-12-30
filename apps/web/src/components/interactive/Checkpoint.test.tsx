import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkpoint } from '@/components/interactive/Checkpoint';
import { LanguageContext } from '@/i18n';

// Mock the language context
const mockLanguageContext = {
  language: 'en' as const,
  setLanguage: () => {},
  t: (key: string) => {
    const translations: Record<string, string> = {
      'lesson.checkpointCompleted': 'Checkpoint completed!',
      'lesson.markComplete': 'Mark as complete',
    };
    return translations[key] || key;
  },
};

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <LanguageContext.Provider value={mockLanguageContext}>
      {component}
    </LanguageContext.Provider>
  );
};

describe('Checkpoint', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with label', () => {
    renderWithContext(
      <Checkpoint id="test-cp" lessonKey="test-lesson" label="Test Checkpoint" />
    );

    expect(screen.getByText('Test Checkpoint')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    renderWithContext(
      <Checkpoint id="test-cp" lessonKey="test-lesson" />
    );

    // Get the checkbox button (the first one with aria-pressed)
    const buttons = screen.getAllByRole('button');
    const checkboxButton = buttons.find(btn => btn.hasAttribute('aria-pressed'));
    expect(checkboxButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles completion on click', () => {
    renderWithContext(
      <Checkpoint id="test-cp" lessonKey="test-lesson" />
    );

    // Get the checkbox button (the one with aria-pressed)
    const buttons = screen.getAllByRole('button');
    const checkboxButton = buttons.find(btn => btn.hasAttribute('aria-pressed'));
    fireEvent.click(checkboxButton!);

    expect(checkboxButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows completed message when checked', () => {
    renderWithContext(
      <Checkpoint id="test-cp" lessonKey="test-lesson" />
    );

    // Get the checkbox button (the one with aria-pressed)
    const buttons = screen.getAllByRole('button');
    const checkboxButton = buttons.find(btn => btn.hasAttribute('aria-pressed'));
    fireEvent.click(checkboxButton!);

    // Should have at least one element with the completed text
    const completedElements = screen.getAllByText(/checkpoint completed/i);
    expect(completedElements.length).toBeGreaterThan(0);
  });
});
