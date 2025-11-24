"use client";

import { IAppointment } from "@/types/appionment.interface";
import ChangeAppointmentStatusDialog from "./ChangeAppointmentStatusDialog";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ManagementTable from "../../shared/ManagementTable";
import AppointmentViewDetailDialog from "./AppoinmentViewDetails";
import { appointmentsColumns } from "./AppoinmentColum";

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

const AppointmentsTable = ({ appointments }: AppointmentsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewingAppointment, setViewingAppointment] =
    useState<IAppointment | null>(null);
  const [changingStatusAppointment, setChangingStatusAppointment] =
    useState<IAppointment | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (appointment: IAppointment) => {
    setViewingAppointment(appointment);
  };

  const handleEdit = (appointment: IAppointment) => {
    setChangingStatusAppointment(appointment);
  };

  return (
    <>
      <ManagementTable
        data={appointments}
        columns={appointmentsColumns}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(appointment) => appointment.id!}
        emptyMessage="No appointments found"
      />

      {/* View Appointment Detail Dialog */}
      <AppointmentViewDetailDialog
        open={!!viewingAppointment}
        onClose={() => setViewingAppointment(null)}
        appointment={viewingAppointment}
      />

      {/* Change Status Dialog */}
      <ChangeAppointmentStatusDialog
        open={!!changingStatusAppointment}
        onClose={() => setChangingStatusAppointment(null)}
        appointment={changingStatusAppointment}
        onSuccess={() => {
          setChangingStatusAppointment(null);
          handleRefresh();
        }}
      />
    </>
  );
};

export default AppointmentsTable;
