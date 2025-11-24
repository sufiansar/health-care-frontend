import { ManagementPageLoading } from "@/components/modules/shared/ManagementPageLoader";

const AppointmentsManagementloading = () => {
  return (
    <div>
      <ManagementPageLoading
        columns={5}
        hasActionButton={true}
        filterCount={3}
        filterWidths={["w-40", "w-32", "w-48"]}
      />
    </div>
  );
};

export default AppointmentsManagementloading;
