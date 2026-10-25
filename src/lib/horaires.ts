import horaires from '../data/horaires.json';

export type Lang = 'fr' | 'en';
export const jours = horaires.jours;

/** "19:30" -> "19 h 30" (fr) / "7:30 pm" (en) */
export function fmtHeure(h: string, lang: Lang = 'fr'): string {
  const [hh, mm] = h.split(':').map(Number);
  if (lang === 'en') {
    const suffix = hh >= 12 ? 'pm' : 'am';
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return mm ? `${h12}:${String(mm).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
  }
  return mm ? `${hh} h ${String(mm).padStart(2, '0')}` : `${hh} h`;
}

export function fmtCreneau(c: string[], lang: Lang = 'fr'): string {
  if (lang === 'en') {
    // "12–2 pm", "7:30–9:30 pm" quand les deux heures sont l'après-midi
    const a = fmtHeure(c[0], 'en');
    const b = fmtHeure(c[1], 'en');
    const sa = a.slice(-2);
    if (sa === b.slice(-2)) return `${a.slice(0, -3)}–${b}`;
    return `${a} – ${b}`;
  }
  return `${fmtHeure(c[0], lang)} – ${fmtHeure(c[1], lang)}`;
}

const toMin = (h: string) => {
  const [hh, mm] = h.split(':').map(Number);
  return hh * 60 + mm;
};

/** Heure courante à Paris : { jour (0=dimanche), minutes } */
export function maintenantParis(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: horaires.fuseau,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { jour: map[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function statut(lang: Lang = 'fr', date = new Date()) {
  const { jour, minutes } = maintenantParis(date);
  const parNum = (n: number) => jours.find((j) => j.num === n)!;
  const today = parNum(jour);
  for (const c of today.creneaux) {
    if (minutes >= toMin(c[0]) && minutes < toMin(c[1])) {
      const reste = toMin(c[1]) - minutes;
      return {
        ouvert: true,
        bientot: reste <= 30,
        texte:
          lang === 'en'
            ? `Open now, until ${fmtHeure(c[1], 'en')}`
            : `Ouvert maintenant, jusqu'à ${fmtHeure(c[1])}`,
        jour,
      };
    }
  }
  // prochaine ouverture
  for (let d = 0; d < 8; d++) {
    const num = (jour + d) % 7;
    const j = parNum(num);
    for (const c of j.creneaux) {
      if (d === 0 && toMin(c[0]) <= minutes) continue;
      let quand: string;
      if (lang === 'en') {
        quand = d === 0 ? 'today' : d === 1 ? 'tomorrow' : j.en;
        return { ouvert: false, bientot: false, texte: `Closed, opens ${quand} at ${fmtHeure(c[0], 'en')}`, jour };
      }
      quand = d === 0 ? "aujourd'hui" : d === 1 ? 'demain' : j.jour.toLowerCase();
      return { ouvert: false, bientot: false, texte: `Fermé, réouverture ${quand} à ${fmtHeure(c[0])}`, jour };
    }
  }
  return { ouvert: false, bientot: false, texte: lang === 'en' ? 'Closed' : 'Fermé', jour };
}
