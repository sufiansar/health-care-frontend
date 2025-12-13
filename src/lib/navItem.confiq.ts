import { NavSection } from "@/types/dashboard.Interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const commonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      title: "Dashboard",
      items: [
        {
          title: "Home",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["ADMIN", "DOCTOR", "PATIENT"],
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
          roles: ["ADMIN", "DOCTOR", "PATIENT"],
        },
        {
          title: "Home Page",
          href: "/",
          icon: "Home",
          roles: ["ADMIN", "DOCTOR", "PATIENT"],
        },
        {
          title: "Change Password",
          href: "/change-password",
          icon: "LockClosed",
          roles: ["ADMIN", "DOCTOR", "PATIENT"],
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Doctors",
        href: "/admin/dashboard/doctors-management",
        icon: "Stethoscope",
        roles: ["ADMIN"],
      },
      {
        title: "Patients",
        href: "/admin/dashboard/patients-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar",
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock",
        roles: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const doctorNavItems: NavSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "My Appointments",
        href: "/doctor/dashboard/appointments",
        icon: "CalendarCheck",
        roles: ["DOCTOR"],
      },
      {
        title: "My Schedule",
        href: "/doctor/dashboard/my-schedule",
        icon: "Clock",
        roles: ["DOCTOR"],
      },
    ],
  },
];

export const patientNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-appointments",
        icon: "Calendar",
        roles: ["PATIENT"],
      },
      {
        title: "Book Appointment",
        href: "/dashboard/book-appointment",
        icon: "ClipboardList",
        roles: ["PATIENT"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText",
        roles: ["PATIENT"],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity",
        roles: ["PATIENT"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const getcommonNavItems = commonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...getcommonNavItems, ...adminNavItems];
    case "DOCTOR":
      return [...getcommonNavItems, ...doctorNavItems];
    case "PATIENT":
      return [...getcommonNavItems, ...patientNavItems];
    default:
      return [];
  }
};
