/** Shared section heading: "// <title>" with the scroll-reveal animation. */
export default function SectionTitle({ children }) {
  return (
    <h2 className="section__title reveal">
      <span className="section__title-prefix">//</span> {children}
    </h2>
  );
}
