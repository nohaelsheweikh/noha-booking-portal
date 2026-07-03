import DetailsStep from "./DetailsStep";
import LoadingOverlay from "./LoadingOverlay";
import PackageStep from "./PackageStep";
import WhenStep from "./WhenStep";

export default function BookingForm({
  step,
  date,
  time,
  pkg,
  level,
  guestName,
  loading,
  loadingMsg,
  onDateChange,
  onTimeChange,
  onPackageChange,
  onLevelChange,
  onGuestNameChange,
  onSubmit,
  onBack,
}) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      {step === 0 && (
        <WhenStep date={date} time={time} onDateChange={onDateChange} onTimeChange={onTimeChange} />
      )}

      {step === 1 && (
        <PackageStep
          pkg={pkg}
          level={level}
          onPackageChange={onPackageChange}
          onLevelChange={onLevelChange}
        />
      )}

      {step === 2 && (
        <DetailsStep
          date={date}
          time={time}
          pkg={pkg}
          level={level}
          guestName={guestName}
          onGuestNameChange={onGuestNameChange}
        />
      )}

      {loading && <LoadingOverlay message={loadingMsg} />}

      <div className="form-nav">
        {step > 0 && (
          <button type="button" className="btn-back" onClick={onBack} disabled={loading}>
            ← Back
          </button>
        )}
        <button type="submit" className="btn-next" disabled={loading}>
          {step === 2 ? "Submit booking request →" : "Continue →"}
        </button>
      </div>
    </form>
  );
}
