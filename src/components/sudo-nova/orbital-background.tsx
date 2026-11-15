import styles from "./landing.module.css";

// Decorative interpretation: reflector, boom, spacecraft and solar panels.
// This illustration is not a technical model or an observation visualization.
export default function OrbitalBackground() {
  return <div className={styles.orbitalBackground} aria-hidden="true">
    <svg viewBox="0 0 640 640" fill="none" className={styles.satellite}>
      <g stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="340" cy="196" rx="166" ry="104" fill="currentColor" fillOpacity=".035"/>
        <ellipse cx="340" cy="196" rx="115" ry="104"/>
        <ellipse cx="340" cy="196" rx="55" ry="104"/>
        <ellipse cx="340" cy="196" rx="166" ry="60"/>
        <path d="M174 196h332M340 92v208M206 135l268 122M206 257l268-122"/>
        <path d="M340 196l-82 196 30 8 68-200M258 392l30 8M265 372l30 7M273 352l29 6M281 332l28 5"/>
        <path d="m242 388 72 10 19 65-73 15-32-37Z" fill="currentColor" fillOpacity=".12"/>
        <path d="m242 388 25 46 66 29M267 434l-7 44"/>
        <path d="m244 426-136-34-18 74 155 22Zm83 0 146-34 20 74-157 22Z" fill="currentColor" fillOpacity=".06"/>
        <path d="m101 417 140 34m-146-10 148 34m-111-77-17 72m45-65-15 72m45-65-12 72m43-65-10 72M333 451l147-34m-144 58 150-34m-34-44 18 73m-48-65 16 72m-46-65 13 72m-44-65 10 72"/>
        <path d="M275 497q-50 30-100 0m113 30q-66 46-132 0m145 30q-83 62-166 0" strokeDasharray="3 9" opacity=".5"/>
      </g>
    </svg>
  </div>;
}
