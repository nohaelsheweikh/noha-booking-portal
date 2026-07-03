import {
  HERO_SUBTITLE,
  PORTAL_NAME,
} from "../constants/copy";
import BookingForm from "../components/booking/BookingForm";
import FinePrint from "../components/layout/FinePrint";
import Hero from "../components/layout/Hero";
import StepIndicator from "../components/layout/StepIndicator";
import PageLayout from "../components/layout/PageLayout";

export default function BookingWizardContainer({ wizard }) {
  const {
    step,
    date,
    time,
    pkg,
    level,
    guestName,
    loading,
    loadingMsg,
    setDate,
    setTime,
    setPkg,
    setLevel,
    setGuestName,
    handleNext,
    goBack,
  } = wizard;

  return (
    <PageLayout>
      <Hero title={PORTAL_NAME} subtitle={HERO_SUBTITLE} />

      <StepIndicator currentStep={step} />

      <BookingForm
        step={step}
        date={date}
        time={time}
        pkg={pkg}
        level={level}
        guestName={guestName}
        loading={loading}
        loadingMsg={loadingMsg}
        onDateChange={setDate}
        onTimeChange={setTime}
        onPackageChange={setPkg}
        onLevelChange={setLevel}
        onGuestNameChange={setGuestName}
        onSubmit={handleNext}
        onBack={goBack}
      />

      <FinePrint />
    </PageLayout>
  );
}
