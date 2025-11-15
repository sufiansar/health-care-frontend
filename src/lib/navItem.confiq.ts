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
    title: "Management",
    items: [
      {
        title: "Admins",
        href: "/admins/dashboard/admins-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
      {
        title: "Doctors",
        href: "/admins/dashboard/doctors-management",
        icon: "Stethoscope",
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admins/dashboard/schedules-management",
        icon: "Clock",
        roles: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/admins/dashboard/specialities-management",
        icon: "Clock",
        roles: ["ADMIN"],
      },
      {
        title: "Appointments",
        href: "/admins/dashboard/appointments-management",
        icon: "CalendarCheck",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const doctorNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/doctor/appointments",
        icon: "CalendarCheck",
        roles: ["DOCTOR"],
      },
      {
        title: "My Schedule",
        href: "/doctor/schedule",
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
        title: "Book Appointment",
        href: "/dashboard/book-appointment",
        icon: "CalendarPlus",
        roles: ["PATIENT"],
      },
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescription",
        icon: "CalendarCheck",
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
