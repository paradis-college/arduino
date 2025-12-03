import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';
import type p5 from 'p5';
import { getSketch, type SketchFunction } from '@/sketches/registry';

export type { SketchFunction };

export interface P5SketchEmbedProps {
  /** Unique identifier for the sketch (used for DOM id) */
  id: string;
  /** The p5.js sketch function - can be passed directly or use sketchId instead */
  sketch?: SketchFunction;
  /** String ID to look up sketch from registry - alternative to passing sketch directly */
  sketchId?: string;
  /** Step number for ordering */
  stepNumber?: number;
  /** Brief title for the step */
  title?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Width of the canvas (default: 600) */
  width?: number;
  /** Height of the canvas (default: 400) */
  height?: number;
  /** Detailed explanation shown below the sketch */
  children?: ReactNode;
}

/**
 * P5SketchEmbed component
 * Embeds an interactive p5.js sketch with detailed textual explanation
 * Replaces static GIF placeholders with live interactive visualizations
 */
export const P5SketchEmbed: FC<P5SketchEmbedProps> = ({
  id,
  sketch,
  sketchId,
  stepNumber,
  title,
  alt,
  width = 600,
  height = 400,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Resolve the sketch function from either direct prop or registry
  const resolvedSketch = sketch || (sketchId ? getSketch(sketchId) : undefined);

  useEffect(() => {
    let mounted = true;

    const initSketch = async () => {
      if (!containerRef.current || !mounted) return;

      if (!resolvedSketch) {
        setError(`Sketch not found: ${sketchId || 'no sketch provided'}`);
        return;
      }

      // Dynamically import p5 to avoid SSR issues
      const p5Module = await import('p5');
      const P5 = p5Module.default;

      if (!mounted || !containerRef.current) return;

      // Clean up any existing instance
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }

      // Create new p5 instance - the sketch function sets up its own setup/draw
      const p5Instance = new P5(resolvedSketch, containerRef.current);

      p5InstanceRef.current = p5Instance;
      setError(null);
    };

    initSketch();

    return () => {
      mounted = false;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [resolvedSketch, sketchId, width, height]);

  return (
    <div className="my-6 rounded-lg border border-border bg-surface overflow-hidden">
      {/* Header with step number and title */}
      {(stepNumber !== undefined || title) && (
        <div className="bg-primary/5 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            {stepNumber !== undefined && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-sm">
                  {stepNumber}
                </span>
              </div>
            )}
            {title && (
              <h4 className="font-semibold text-text">{title}</h4>
            )}
          </div>
        </div>
      )}

      {/* p5.js Sketch Container */}
      <div className="bg-background-alt p-4">
        <div 
          className="rounded-lg overflow-hidden border border-border/50 max-w-2xl mx-auto"
          role="img"
          aria-label={alt || title || 'Interactive p5.js sketch'}
        >
          {error ? (
            <div 
              className="flex items-center justify-center text-error text-sm p-4"
              style={{ minHeight: height }}
            >
              {error}
            </div>
          ) : (
            <div
              ref={containerRef}
              id={id}
              className="flex items-center justify-center"
              style={{ minHeight: height }}
            />
          )}
        </div>
      </div>

      {/* Detailed explanation */}
      {children && (
        <div className="p-4 text-text-secondary">
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default P5SketchEmbed;
