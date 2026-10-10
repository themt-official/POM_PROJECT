import HeroIntro from "./components/sections/HeroIntro";
import FeatureDesign from "./components/sections/FeatureDesign";
import FeaturePerformance from "./components/sections/FeaturePerformance";
import FeatureCamera from "./components/sections/FeatureCamera";
import SpecsAndColor from "./components/sections/SpecsAndColor";
import ClosingCTA from "./components/sections/ClosingCTA";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroIntro />
      <FeatureDesign />
      <FeaturePerformance />
      <FeatureCamera />
      <SpecsAndColor />
      <ClosingCTA />
    </main>
  );
}
