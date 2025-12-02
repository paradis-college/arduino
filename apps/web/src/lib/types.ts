/**
 * Shared types for the Arduino learning platform
 */

/** Supported languages */
export type Language = 'ro' | 'en';

/** Difficulty levels for lessons */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/** Theme options */
export type Theme = 'light' | 'dark';

/** Key point for lesson video section */
export interface LessonKeyPoint {
  title: string;
  description?: string;
}

/** Lesson metadata from MDX frontmatter */
export interface LessonMeta {
  id: string;
  slug: string;
  title: string;
  description?: string;
  course: string;
  difficulty: Difficulty;
  tags: string[];
  estimatedMinutes: number;
  tinkercadUrl?: string;
  youtubeUrl?: string;
  keyPoints?: LessonKeyPoint[];
  hasInteractiveExercises: boolean;
  language: Language;
  order?: number;
}

/** Course metadata */
export interface CourseMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  lessonCount: number;
  estimatedHours: number;
  tags: string[];
  thumbnail?: string;
}

/** State for a single checkpoint */
export interface CheckpointState {
  id: string;
  completed: boolean;
  completedAt?: number;
}

/** Progress state for a lesson */
export interface LessonProgress {
  lessonKey: string;
  checkpoints: Record<string, CheckpointState>;
  saved: boolean;
  stars: number;
  lastVisited?: number;
  startedAt?: number;
  completedAt?: number;
}

/** Overall progress store structure */
export interface ProgressStore {
  version: number;
  lessons: Record<string, LessonProgress>;
  preferredLanguage: Language;
}

/** Community project metadata */
export interface ProjectMeta {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  course: string;
  difficulty: Difficulty;
  components: string[];
  imageUrl?: string;
  tinkercadUrl?: string;
  createdAt: number;
  likes: number;
}

/** Exercise option for multiple choice */
export interface ExerciseOption {
  id: string;
  text: string;
}

/** Pin mapping pair for pin mapping exercise */
export interface PinMapping {
  pinLabel: string;
  componentLabel: string;
}

/** Navigation item for the navbar */
export interface NavItem {
  key: string;
  labelKey: string;
  path: string;
}

/** Heading for lesson outline */
export interface OutlineHeading {
  id: string;
  text: string;
  level: 2 | 3;
}
