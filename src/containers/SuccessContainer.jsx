import Hero from "../components/layout/Hero";
import PageLayout from "../components/layout/PageLayout";
import SuccessView from "../components/success/SuccessView";

export default function SuccessContainer({ booking, onReset }) {
  return (
    <PageLayout>
      <SuccessView booking={booking} onReset={onReset} />
    </PageLayout>
  );
}
