import { useBookingWizard } from "./hooks/useBookingWizard";
import BookingWizardContainer from "./containers/BookingWizardContainer";
import ShareContainer from "./containers/ShareContainer";
import SuccessContainer from "./containers/SuccessContainer";

export default function App() {
  const wizard = useBookingWizard();

  if (wizard.isShareMode && wizard.booking) {
    return <ShareContainer booking={wizard.booking} onReset={wizard.reset} />;
  }

  if (wizard.isSuccess) {
    return <SuccessContainer booking={wizard.booking} onReset={wizard.reset} />;
  }

  return <BookingWizardContainer wizard={wizard} />;
}
