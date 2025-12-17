import AppointmentsList from "@/components/modules/Patients/PatientAppionment/AppointmentsList";
import { getMyAppointments } from "@/services/patient/appionment.service";
import { IAppointment } from "@/types/appionment.interface";

export default async function MyAppointmentsPage() {
  const response = await getMyAppointments();
  console.log(response);
  const appointments: IAppointment[] = response?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your scheduled appointments
        </p>
      </div>

      <AppointmentsList appointments={appointments} />
    </div>
  );
}
