import AppointmentsFilter from "@/components/modules/Admin/AppoinmentManagements/AppoinmentFilters";
import AppointmentsTable from "@/components/modules/Admin/AppoinmentManagements/AppoinmentTable";
import ManagementPageHeader from "@/components/modules/shared/ManagementPageHeader";
import TablePagination from "@/components/modules/shared/TablePagination";
import { TableSkeleton } from "@/components/modules/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllAppionments } from "@/services/admin/appionmentManagement";
import { Suspense } from "react";

const AppointmentsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const response = await getAllAppionments(queryString);
  console.log(response.data);

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Appointments Management"
        description="View and manage all appointments"
      />

      <AppointmentsFilter />

      <Suspense fallback={<TableSkeleton columns={7} />}>
        <AppointmentsTable appointments={response?.data?.data || []} />
      </Suspense>

      <TablePagination
        currentPage={response?.meta?.page || 1}
        totalPages={response?.meta?.totalPage || 1}
      />
    </div>
  );
};

export default AppointmentsManagementPage;
