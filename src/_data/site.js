import "dotenv/config"; // Loads .env file
 
const isDevelopment = process.env.NODE_ENV === "development";
console.log(`landscape env: ${process.env.NODE_ENV}`);

export default {
  title: "Fachanwältin für Familienrecht - Kanzlei Eisemann",
  description: "Fachanwältin für Familienrecht in Berlin. Spezialisiert auf Scheidung, Unterhalt, Sorgerecht und Eheverträge. Persönliche und kompetente Beratung.",
  keywords: "Familienrecht Berlin, Fachanwältin für Familienrecht, Scheidungsanwalt Berlin, Unterhaltsrecht Berlin, Sorgerecht Anwalt Berlin, Umgangsrecht Beratung, Ehevertrag Berlin, Trennungsvereinbarung, Scheidungsfolgenvereinbarung, Vermögensauseinandersetzung, Zugewinnausgleich, Vaterschaftsanfechtung, Familienrechtliche Beratung, Familienanwalt Charlottenburg, Familienrechtliche Mediation",
  domain: isDevelopment ? "http://localhost:8080" : "https://eisemann-familienrecht.de/",
  environment: process.env.NODE_ENV || "development",
  instaUrl: "",
  facebookUrl: "",
  linkedinUrl: "",
  email: "",
};