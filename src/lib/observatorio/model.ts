import original from './measurements.json';

export type Measurement = [string, number | null, number | null, number | null];
export type Survey = { id: string; name: string; data: Measurement[] };
export const surveys: Survey[] = original as unknown as Survey[];
export const MATRIX_DATE = '2026-11-02';
export const FIRST_DATE = surveys.flatMap(s => s.data.map(p => p[0])).sort()[0];
export const LAST_DATE = surveys.flatMap(s => s.data.map(p => p[0])).sort().at(-1)!;
export const metrics = [
  { name: 'Aprobación', color: '#880E4F' },
  { name: 'Desaprobación', color: '#346A78' },
  { name: 'NS/NR', color: '#8B661D' },
];
const DAY = 86400000;
export const time = (d: string) => Date.parse(d + 'T00:00:00Z');
export const shift = (d: string, days: number) => new Date(time(d) + days * DAY).toISOString().slice(0, 10);
export const age = (cut: string, date: string) => (time(cut) - time(date)) / DAY;
export const dateLabel = (d: string) => d.split('-').reverse().join('-');
export const numberLabel = (n: number | null) => n === null ? 'Sin dato' : n.toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
export function latest(s: Survey, cut: string) { return s.data.filter(p => p[0] <= cut).at(-1); }
export function average(cut: string, source: Survey[] = surveys) {
  const entries = source.map(s => ({ survey: s, point: latest(s, cut) }));
  const included = entries.filter(e => e.point && age(cut, e.point[0]) < 30);
  const excluded = entries.filter(e => !e.point || age(cut, e.point[0]) >= 30);
  const counts = [1, 2, 3].map(i => included.filter(e => e.point![i] !== null).length);
  const values = [1, 2, 3].map((i, j) => counts[j] ? included.reduce((sum, e) => sum + (e.point![i] as number ?? 0), 0) / counts[j] : null);
  return { included, excluded, counts, values };
}
export function interval(cut: string, period: string) {
  return { start: period === 'all' ? FIRST_DATE : shift(cut, 1 - Number(period)), end: cut };
}
// Daily calculated estimates, never represented as additional survey measurements.
// Daily evaluation also captures expiration when no new survey was published.
export function history(start: string, cut: string) {
  const result: Measurement[] = [];
  for (let d = start; d <= cut; d = shift(d, 1)) {
    result.push([d, ...average(d).values] as Measurement);
  }
  return result;
}
export function variation(s: Survey, cut: string) {
  const points = s.data.filter(p => p[0] <= cut);
  const current = points.at(-1), previous = points.at(-2);
  return { current, previous, stale: !!current && age(cut, current[0]) >= 30,
    deltas: [1, 2, 3].map(i => current && previous && current[i] !== null && previous[i] !== null ? (current[i] as number) - (previous[i] as number) : null) };
}
export function deltaLabel(n: number | null) {
  if (n === null) return 'Sin dato para comparar';
  const value = Math.abs(n).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return n > 0 ? `↑ +${value} pp` : n < 0 ? `↓ −${value} pp` : '— 0,0 pp';
}
export function csv(selected: string[], cut: string) {
  return '\uFEFFEncuestadora;Fecha;Aprobación;Desaprobación;NS/NR;Origen\r\n' + surveys.filter(s => selected.includes(s.id)).flatMap(s => s.data.filter(p => p[0] <= cut).map(p => [s.name, p[0], ...p.slice(1).map(v => v === null ? '' : String(v).replace('.', ',')), 'Matriz 02-11-2026, sin reverificar informes'].join(';'))).join('\r\n');
}
