import PatientsFilter from "@/components/modules/Admin/PatientsManagement/PatientsFilters";
import PatientsTable from "@/components/modules/Admin/PatientsManagement/PatientsTable";
import ManagementPageHeader from "@/components/modules/shared/ManagementPageHeader";
import TablePagination from "@/components/modules/shared/TablePagination";
import { TableSkeleton } from "@/components/modules/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getPatients } from "@/services/admin/patientManagement";

import { Suspense } from "react";

const AdminPatientsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const patientsResult = await getPatients(queryString);
  console.log(patientsResult?.data?.data);

  const totalPages = Math.ceil(
    (patientsResult?.meta?.total || 1) / (patientsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Patients Management"
        description="Manage patients information and details"
      />

      {/* Search, Filters */}
      <PatientsFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        {!patientsResult ? (
          <div>No patients found.</div>
        ) : (
          <PatientsTable patients={patientsResult?.data?.data} />
        )}
        <TablePagination
          currentPage={patientsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminPatientsManagementPage;
