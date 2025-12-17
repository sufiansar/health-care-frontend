"use client";

import { Badge } from "@/components/ui/badge";
import { IDoctorSchedule } from "@/types/schedule.interface";
import { format, isBefore, startOfDay, parseISO } from "date-fns";
import { Column } from "../../shared/ManagementTable";

// Check if a schedule is in the past
const isPastSchedule = (schedule: IDoctorSchedule) => {
  if (!schedule.schedule?.startDateTime) return false;
  return isBefore(
    parseISO(schedule.schedule.startDateTime),
    startOfDay(new Date())
  );
};

export const myScheduleColumns: Column<IDoctorSchedule>[] = [
  {
    header: "Date",
    accessor: (schedule) => {
      if (!schedule.schedule?.startDateTime) return <span>-</span>;
      const date = parseISO(schedule.schedule.startDateTime);
      return <span className="font-medium">{format(date, "MMM d, yyyy")}</span>;
    },
    sortKey: "schedule.startDateTime",
  },
  {
    header: "Time Slot",
    accessor: (schedule) => {
      if (!schedule.schedule?.startDateTime || !schedule.schedule?.endDateTime)
        return <span>-</span>;
      const start = parseISO(schedule.schedule.startDateTime);
      const end = parseISO(schedule.schedule.endDateTime);
      return (
        <span className="text-sm">{`${format(start, "h:mm a")} - ${format(
          end,
          "h:mm a"
        )}`}</span>
      );
    },
  },
  {
    header: "Status",
    accessor: (schedule) => {
      const isPast = isPastSchedule(schedule);
      return isPast ? (
        <Badge variant="secondary">Past</Badge>
      ) : (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Upcoming
        </Badge>
      );
    },
  },
  {
    header: "Booking Status",
    accessor: (schedule) =>
      schedule.isBooked ? (
        <Badge variant="default" className="bg-blue-600 text-white">
          Booked
        </Badge>
      ) : (
        <Badge variant="outline">Available</Badge>
      ),
  },
];
