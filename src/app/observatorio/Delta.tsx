import { deltaLabel } from '@/lib/observatorio/model';

export default function Delta({ value }: { value: number | null }) {
  const direction = value === null || value === 0 ? 'neutral' : value > 0 ? 'up' : 'down';
  return <span className={`obs-variation obs-variation-${direction}`}>{deltaLabel(value)}</span>;
}
