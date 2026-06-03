/** Decorative placeholder artwork for a project card, by category. */
export default function ProjectThumbnail({ category }) {
  if (category === 'data') {
    return (
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="var(--card-bg)" />
        <polyline points="20,160 80,110 140,130 200,70 260,90 300,50" stroke="var(--accent)" strokeWidth="2" fill="none" />
        <circle cx="80" cy="110" r="4" fill="var(--accent)" />
        <circle cx="140" cy="130" r="4" fill="var(--accent)" />
        <circle cx="200" cy="70" r="4" fill="var(--accent)" />
        <circle cx="260" cy="90" r="4" fill="var(--accent)" />
        <rect x="20" y="170" width="280" height="1" fill="var(--text-muted)" opacity="0.2" />
      </svg>
    );
  }
  if (category === 'app') {
    return (
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="var(--card-bg)" />
        <rect x="110" y="10" width="100" height="180" rx="10" fill="var(--accent)" opacity="0.1" />
        <rect x="120" y="25" width="80" height="120" rx="4" fill="var(--accent)" opacity="0.15" />
        <circle cx="160" cy="165" r="8" fill="var(--accent)" opacity="0.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="var(--card-bg)" />
      <rect x="20" y="20" width="280" height="30" rx="4" fill="var(--accent)" opacity="0.15" />
      <rect x="20" y="62" width="180" height="12" rx="2" fill="var(--text-muted)" opacity="0.3" />
      <rect x="20" y="82" width="140" height="12" rx="2" fill="var(--text-muted)" opacity="0.2" />
      <rect x="20" y="110" width="130" height="60" rx="4" fill="var(--accent)" opacity="0.1" />
      <rect x="165" y="110" width="135" height="60" rx="4" fill="var(--accent)" opacity="0.08" />
    </svg>
  );
}
