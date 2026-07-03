import { SHARE_HERO_TITLE, shareHeroSubtitle } from "../constants/copy";
import Hero from "../components/layout/Hero";
import PageLayout from "../components/layout/PageLayout";
import SuccessView from "../components/success/SuccessView";

export default function ShareContainer({ booking, onReset }) {
  return (
    <PageLayout>
      <Hero
        compact
        title={SHARE_HERO_TITLE}
        subtitle={shareHeroSubtitle(booking.guestName)}
      />
      <SuccessView booking={booking} onReset={onReset} showShareLink={false} />
    </PageLayout>
  );
}
