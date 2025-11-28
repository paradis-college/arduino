import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExerciseMultipleChoice } from '@/components/interactive/ExerciseMultipleChoice';
import { LanguageContext } from '@/i18n';

// Mock the language context
const mockLanguageContext = {
  language: 'en' as const,
  setLanguage: () => {},
  t: (key: string) => {
    const translations: Record<string, string> = {
      'exercise.checkAnswer': 'Check Answer',
      'exercise.correct': 'Correct! ✓',
      'exercise.incorrect': 'Incorrect. Try again.',
      'exercise.tryAgain': 'Try Again',
    };
    return translations[key] || key;
  },
};

const mockOptions = [
  { id: 'a', text: 'Option A' },
  { id: 'b', text: 'Option B' },
  { id: 'c', text: 'Option C' },
];

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <LanguageContext.Provider value={mockLanguageContext}>
      {component}
    </LanguageContext.Provider>
  );
};

describe('ExerciseMultipleChoice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders question and options', () => {
    renderWithContext(
      <ExerciseMultipleChoice
        id="test-quiz"
        lessonKey="test-lesson"
        question="What is the answer?"
        options={mockOptions}
        correctIndex={1}
      />
    );
    
    expect(screen.getByText('What is the answer?')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('enables check button only after selection', () => {
    renderWithContext(
      <ExerciseMultipleChoice
        id="test-quiz"
        lessonKey="test-lesson"
        question="What is the answer?"
        options={mockOptions}
        correctIndex={1}
      />
    );
    
    const checkButton = screen.getByRole('button', { name: /check answer/i });
    expect(checkButton).toBeDisabled();
    
    fireEvent.click(screen.getByText('Option A'));
    expect(checkButton).not.toBeDisabled();
  });

  it('shows correct feedback for right answer', () => {
    renderWithContext(
      <ExerciseMultipleChoice
        id="test-quiz"
        lessonKey="test-lesson"
        question="What is the answer?"
        options={mockOptions}
        correctIndex={1}
      />
    );
    
    fireEvent.click(screen.getByText('Option B')); // correct answer
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));
    
    expect(screen.getByText(/correct/i)).toBeInTheDocument();
  });

  it('shows incorrect feedback for wrong answer', () => {
    renderWithContext(
      <ExerciseMultipleChoice
        id="test-quiz"
        lessonKey="test-lesson"
        question="What is the answer?"
        options={mockOptions}
        correctIndex={1}
      />
    );
    
    fireEvent.click(screen.getByText('Option A')); // wrong answer
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));
    
    expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
  });

  it('shows try again button after wrong answer', () => {
    renderWithContext(
      <ExerciseMultipleChoice
        id="test-quiz"
        lessonKey="test-lesson"
        question="What is the answer?"
        options={mockOptions}
        correctIndex={1}
      />
    );
    
    fireEvent.click(screen.getByText('Option A'));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));
    
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});
