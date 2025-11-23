"use client";

import { Star } from "lucide-react";
import { Column } from "../../shared/ManagementTable";
import { IDoctor } from "@/types/doctors.interface";
import { UserInfoCell } from "../../shared/cell/UserInfoCell";
import { StatusBadgeCell } from "../../shared/cell/StatusBadgeCell";
import { DateCell } from "../../shared/cell/DateCell";
import { IPatient } from "@/types/patient.interface";

export const patientsColumns: Column<IPatient>[] = [
  {
    header: "Patient",
    accessor: (patient) => (
      <UserInfoCell
        name={patient.name}
        email={patient.email}
        photo={patient.profilePhoto as string | undefined}
      />
    ),
    sortKey: "name",
  },

  {
    header: "Contact",
    accessor: (patient) => (
      <div className="flex flex-col">
        <span className="text-sm">{patient.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Addess ",
    accessor: (patient) => (
      <div className="flex flex-col">
        <span className="text-sm">{patient.address}</span>
      </div>
    ),
  },
  {
    header: "Gender",
    accessor: (patient) => (
      <span className="text-sm capitalize">
        {patient.patientHealthData?.gender?.toLowerCase() || "N/A"}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (patient) => <StatusBadgeCell isDeleted={patient.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (patient) => <DateCell date={patient.createdAt} />,
    sortKey: "createdAt",
  },
];
