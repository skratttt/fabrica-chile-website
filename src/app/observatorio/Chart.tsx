'use client';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Measurement, average, age, dateLabel, metrics, numberLabel, time, variation, surveys, shift } from '@/lib/observatorio/model';

import Delta from './Delta';
import { sourceColors, indicatorDashes } from '@/lib/observatorio/appearance';

export type ChartSeries = { id: string; name: string; data: Measurement[]; isAverage?: boolean; marker?: number };
type Props = { title?: string; series: ChartSeries[]; start: string; end: string; visible: boolean[]; legendSeries?: ChartSeries[]; selectedIds?: string[]; onToggleSource?: (id: string) => void };
const symbols = ['●', '■', '◆', '▲', '✚'];
function Marker({ x, y, kind, color, large = false }: { x: number; y: number; kind: number; color: string; large?: boolean }) {
  const r = large ? 6 : 3.5;
  const props = { fill: color, stroke: 'var(--obs-paper)', strokeWidth: 1 };
  if (kind === 1) return <rect x={x-r} y={y-r} width={r*2} height={r*2} {...props} />;
  if (kind === 2) return <path d={`M${x},${y-r-1}l${r+1},${r+1}l-${r+1},${r+1}l-${r+1},-${r+1}Z`} {...props} />;
  if (kind === 3) return <path d={`M${x},${y-r-1}l${r+1},${r*2+2}h-${r*2+2}Z`} {...props} />;
  if (kind === 4) return <path d={`M${x-r},${y}h${r*2}M${x},${y-r}v${r*2}`} stroke={color} strokeWidth={large ? 4 : 2.5} />;
  return <circle cx={x} cy={y} r={r} {...props} />;
}
export default function Chart({ title, series, start, end, visible, legendSeries = series, selectedIds, onToggleSource }: Props) {
  const scrubberId = useId();
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1100);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const selectionKey = series.map(s => s.id).join(',') + visible.join(',');
  useEffect(() => { setActiveDate(null); setHighlight(null); setPinned(false); }, [selectionKey]);
  const plotted = series.map(s => ({ ...s, points: s.data.filter(p => p[0] >= start && p[0] <= end) }));
  const dates = [...new Set(plotted.flatMap(s => s.points.filter(p => visible.some((v,i) => v && p[i+1] !== null)).map(p => p[0])))].sort();
  const x = (d: string) => 52 + (time(d) - time(start)) / (time(end) - time(start) || 1) * (width - 76);
  const height = width < 600 ? 360 : 460;
  const bottom = height - 50;
  const y = (v: number) => bottom - v / 100 * (bottom - 25);
  const ticks = [...new Set([start, ...(width < 600 ? [] : [new Date(time(start) + (time(end)-time(start))/2).toISOString().slice(0,10)]), end])];
  const activeIndex = activeDate ? dates.indexOf(activeDate) : -1;
  const detail = activeDate && series.some(s => s.isAverage) ? average(activeDate) : null;
  const changes = activeDate ? plotted.filter(s => !s.isAverage).flatMap<{ id: string; name: string; text: ReactNode; previous: string | null }>(s => {
    const source = surveys.find(source => source.id === s.id);
    if (!source || !s.points.some(p => p[0] === activeDate)) return [];
    const v = variation(source, activeDate);
    if (!v.previous) return [{ id:s.id, name:s.name, text:'Sin medición anterior disponible', previous:null }];
    const parts = metrics.flatMap((m,i) => visible[i] && v.deltas[i] !== null && v.deltas[i] !== 0 ? [<span key={m.name}>{m.name} {numberLabel(v.current![i+1] as number)} % (<Delta value={v.deltas[i]} />)</span>] : []);
    return parts.length ? [{ id:s.id, name:s.name, text:<>{parts.map((part,i)=><span key={i}>{i>0?' · ':''}{part}</span>)}</>, previous:v.previous[0] }] : [];
  }) : [];
  const averageChanges = activeDate && detail ? metrics.flatMap((m,i) => {
    const previous = average(shift(activeDate,-1)).values[i], current=detail.values[i];
    return visible[i] && previous !== null && current !== null && Math.abs(current-previous)>1e-9 ? [<span key={m.name}>{m.name} {numberLabel(current)} % (<Delta value={current-previous}/>)</span>] : [];
  }) : [];
  function inspect(px: number, py: number) {
    let nearest: { date: string; id: string; distance: number } | null = null;
    plotted.forEach(s => s.points.forEach(p => visible.forEach((show,i) => {
      if (!show || p[i+1] === null) return;
      const distance = Math.hypot(x(p[0])-px, y(p[i+1] as number)-py);
      if (!nearest || distance < nearest.distance) nearest = { date:p[0], id:s.id, distance };
    })));
    if (nearest) { const hit = nearest as {date:string;id:string}; setActiveDate(hit.date); setHighlight(hit.id); }
  }
  function clear() { setPinned(false); setActiveDate(null); setHighlight(null); }
  return <figure className="obs-figure obs-explorer">
    <figcaption><h3 className="serif">{title ?? 'Una mirada, todas las fuentes.'}</h3><span>Mueve el cursor o toca las curvas. Haz clic para fijar una fecha. Aprobación: línea continua · Desaprobación: rayas · NS/NR: puntos.</span></figcaption>
    <p className="obs-legend-hint">{onToggleSource ? 'Haz clic en una fuente para mostrarla u ocultarla.' : 'Promedio de todas las encuestadoras vigentes.'}</p>
    <div className="obs-chart-key" role="group" aria-label="Encuestadoras visibles">{legendSeries.map(s => {
      const enabled = selectedIds ? selectedIds.includes(s.id) : true;
      return <button key={s.id} className={`obs-legend-toggle ${enabled ? 'is-on' : 'is-off'}`} aria-pressed={enabled} aria-label={`${enabled ? 'Ocultar' : 'Mostrar'} ${s.name}`} title={`${enabled ? 'Ocultar' : 'Mostrar'} ${s.name}`} onMouseEnter={() => { if(enabled && !pinned) setHighlight(s.id); }} onMouseLeave={() => { if(!pinned) setHighlight(null); }} onFocus={() => {if(enabled && !pinned) setHighlight(s.id);}} onBlur={() => {if(!pinned) setHighlight(null);}} onClick={() => {if(onToggleSource) onToggleSource(s.id);}}><span style={{color:sourceColors[s.id]}} aria-hidden="true">{s.isAverage ? '━' : symbols[s.marker ?? 0]}</span><span>{s.name}</span></button>;
    })}</div>
    <div ref={container} className="obs-chart-scroll"><svg className="obs-chart" viewBox={`0 0 ${width} ${height}`} role="group" aria-label={`Evolución de ${title ?? 'opinión pública'}. Colores y símbolos por encuestadora. Escala fija de 0 a 100 %.`} tabIndex={0}
      onPointerMove={e => {if(!pinned && e.pointerType !== 'touch') {const r=e.currentTarget.getBoundingClientRect();inspect((e.clientX-r.left)*width/r.width,(e.clientY-r.top)*height/r.height);}}}
      onPointerLeave={() => {if(!pinned) {setActiveDate(null);setHighlight(null);}}}
      onPointerDown={e => {const r=e.currentTarget.getBoundingClientRect();inspect((e.clientX-r.left)*width/r.width,(e.clientY-r.top)*height/r.height);setPinned(!pinned);}}
      onKeyDown={e => {if(e.key==='Escape') clear();if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key) && dates.length){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?dates.length-1:Math.max(0,Math.min(dates.length-1,(activeIndex < 0 ? 0 : activeIndex)+(e.key==='ArrowRight'?1:-1)));setActiveDate(dates[next]);setHighlight(null);setPinned(true);}}}>
      {[0,20,40,60,80,100].map(v => <g key={v}><line x1="52" x2={width-24} y1={y(v)} y2={y(v)} stroke="#424242" strokeOpacity=".12"/><text x="42" y={y(v)+5} textAnchor="end">{v}%</text></g>)}
      {ticks.map(d => <text key={d} x={x(d)} y={height-15} textAnchor={d===start?'start':d===end?'end':'middle'}>{dateLabel(d)}</text>)}
      {plotted.map(s => <g key={s.id} className="obs-source-lines" opacity={highlight && highlight!==s.id ? .16 : 1}>{metrics.map((m,i) => visible[i] && <g key={m.name} fill={sourceColors[s.id]} stroke={sourceColors[s.id]}>{s.points.map((p,j) => {
        const value=p[i+1] as number|null,prev=s.points[j-1];if(value===null)return null;
        return <g key={p[0]}><title>{`${s.name} · ${dateLabel(p[0])} · ${m.name}: ${numberLabel(value)} % · Matriz 02-11-2026`}</title>{prev && prev[i+1]!==null && <line x1={x(prev[0])} y1={y(prev[i+1] as number)} x2={x(p[0])} y2={y(value)} strokeWidth={s.isAverage?3.5:highlight===s.id?2.5:1.6} strokeDasharray={indicatorDashes[i]} strokeOpacity={!s.isAverage && age(p[0],prev[0])>30?.4:1}/>}{(!s.isAverage || s.points.length===1 || p[0]===activeDate) && <Marker x={x(p[0])} y={y(value)} kind={s.marker??0} color={sourceColors[s.id]} large={p[0]===activeDate}/>}</g>;
      })}</g>)}</g>)}
      {activeDate && <line x1={x(activeDate)} x2={x(activeDate)} y1="20" y2={bottom} stroke="#424242" strokeDasharray="3 4" pointerEvents="none"/>}
      {!dates.length && <text x={width/2} y={height/2} textAnchor="middle">{!visible.some(Boolean)?'Active al menos un indicador':!series.length?'Selecciona una encuestadora':'Sin datos en este intervalo'}</text>}
    </svg></div>
    <div className="obs-scrubber"><label htmlFor={scrubberId}>{activeDate ? `Explorando el ${dateLabel(activeDate)}` : 'Recorre las fechas del gráfico'}<input id={scrubberId} type="range" min="0" max={Math.max(0,dates.length-1)} value={Math.max(0,activeIndex)} disabled={!dates.length} aria-valuetext={activeDate ? dateLabel(activeDate) : 'Selecciona una fecha'} onChange={e => {setActiveDate(dates[Number(e.target.value)]);setPinned(true);setHighlight(null);}}/></label><button onClick={clear} disabled={!activeDate && !highlight}>{pinned?'Liberar fecha ×':'Limpiar enfoque'}</button></div>
    <div className="obs-date-summary" aria-live="polite" aria-atomic="true">
      {!activeDate ? <p className="obs-note">Explora una fecha para ver qué cambió.</p> : <>
        <p><strong>{dateLabel(activeDate)}</strong>{pinned && <span className="obs-note"> · Fecha fijada</span>}{changes.length ? changes.map(c => <span key={c.id} className="obs-change" title={c.previous ? `Respecto de la medición del ${dateLabel(c.previous)}` : undefined}><strong style={{color:sourceColors[c.id]}}>{c.name}:</strong> {c.text}.</span>) : !detail && <span> · Sin variaciones en los indicadores seleccionados.</span>}{averageChanges.length > 0 && <span className="obs-change"><strong>Promedio:</strong> {averageChanges.map((part,i)=><span key={i}>{i>0?' · ':''}{part}</span>)} <span className="obs-note">(vs. día anterior).</span></span>}{detail && !averageChanges.length && <span className="obs-change">Promedio sin variaciones en los indicadores seleccionados.</span>}</p>
        {detail && <details className="obs-average-sources"><summary>Fuentes del promedio ({detail.included.length})</summary><p className="obs-note">{metrics.map((m,i)=>`${m.name}: ${numberLabel(detail.values[i])}${detail.values[i]===null?'':' %'} (n=${detail.counts[i]})`).join(' · ')}. Participan: {detail.included.map(e=>`${e.survey.name} (${dateLabel(e.point![0])})`).join(', ')||'Sin datos para calcular el promedio'}. Excluidas: {detail.excluded.map(e=>e.survey.name).join(', ')||'Ninguna'}.</p></details>}
      </>}
    </div>
  </figure>;
}
