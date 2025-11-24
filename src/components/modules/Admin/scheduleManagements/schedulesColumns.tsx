"use client";

import { ISchedule } from "@/types/schedule.interface";
import { Clock } from "lucide-react";
import { Column } from "../../shared/ManagementTable";
import { DateCell } from "../../shared/cell/DateCell";

export const schedulesColumns: Column<ISchedule>[] = [
  {
    header: "Start Date & Time",
    accessor: (schedule) => <DateCell date={schedule.startDateTime} />,
    sortKey: "startDateTime",
  },
  {
    header: "End Date & Time",
    accessor: (schedule) => <DateCell date={schedule.endDateTime} />,
    sortKey: "endDateTime",
  },
  {
    header: "Duration",
    accessor: (schedule) => {
      const start = new Date(schedule.startDateTime);
      const end = new Date(schedule.endDateTime);
      const durationMinutes = Math.round(
        (end.getTime() - start.getTime()) / (1000 * 60)
      );
      return (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{durationMinutes} min</span>
        </div>
      );
    },
  },
];
