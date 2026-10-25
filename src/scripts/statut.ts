import { statut, type Lang } from '../lib/horaires';

function maj() {
  const lang = (document.documentElement.lang.startsWith('en') ? 'en' : 'fr') as Lang;
  const s = statut(lang);
  document.querySelectorAll<HTMLElement>('[data-statut]').forEach((el) => {
    el.dataset.etat = s.ouvert ? (s.bientot ? 'bientot' : 'ouvert') : 'ferme';
    const t = el.querySelector('[data-statut-texte]');
    if (t) t.textContent = s.texte;
  });
  document.querySelectorAll<HTMLElement>('[data-jour]').forEach((row) => {
    const today = Number(row.dataset.jour) === s.jour;
    row.toggleAttribute('data-aujourdhui', today);
    if (today) row.setAttribute('aria-current', 'date');
    else row.removeAttribute('aria-current');
  });
}
maj();
setInterval(maj, 60_000);

// Carte Google Maps chargée au clic
document.querySelectorAll<HTMLButtonElement>('[data-carte]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('[data-carte-wrap]');
    if (!wrap) return;
    const iframe = document.createElement('iframe');
    iframe.src = btn.dataset.carte!;
    iframe.title = btn.dataset.titre || 'Carte';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.className = 'carte-iframe';
    wrap.replaceChildren(iframe);
  });
});
