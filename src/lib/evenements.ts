import data from '../data/evenements.json';
import site from '../data/site.json';

export interface Evenement { date: string; heure?: string; groupe: string; style?: string; tarif?: string; exemple?: boolean }

export function evenementsAVenir(): Evenement[] {
  const aujourdhui = new Date().toISOString().slice(0, 10);
  return (data.evenements as Evenement[])
    .filter((e) => e.date >= aujourdhui)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Décalage horaire de Paris à une date donnée : "+01:00" ou "+02:00" */
function offsetParis(iso: string): string {
  const part = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${iso}T12:00:00Z`))
    .find((p) => p.type === 'timeZoneName')?.value;
  const m = part?.match(/GMT([+-]\d{2}:\d{2})/);
  return m ? m[1] : '+01:00';
}

/** JSON-LD Event : uniquement pour les vrais concerts (pas les exemples) */
export function evenementsJsonLd(siteUrl: string) {
  return evenementsAVenir()
    .filter((e) => !e.exemple)
    .map((e) => ({
      '@type': 'Event',
      name: `${e.groupe} en concert à De Grapp'En Verre`,
      startDate: e.heure ? `${e.date}T${e.heure}:00${offsetParis(e.date)}` : e.date,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      performer: { '@type': 'MusicGroup', name: e.groupe },
      location: {
        '@type': 'Restaurant',
        '@id': `${siteUrl}/#restaurant`,
        name: site.nom,
        address: `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`,
      },
      organizer: { '@type': 'Organization', name: site.nom, url: `${siteUrl}/` },
    }));
}
