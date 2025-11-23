import DoctorsManagementHeader from "@/components/modules/Admin/Doctors/DoctorManagementHeader";
import DoctorFilters from "@/components/modules/Admin/Doctors/DoctorsFilters";
import DoctorsTable from "@/components/modules/Admin/Doctors/DoctorsTable";
import TablePagination from "@/components/modules/shared/TablePagination";
import { TableSkeleton } from "@/components/modules/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorsManagement";
import { getSpecialities } from "@/services/admin/speacialitysManagement";
import { ISpecialty } from "@/types/specialty.interface";
import { Suspense } from "react";

const AdminDoctorsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
  const specialitiesResult = await getSpecialities();
  console.log(specialitiesResult);
  const doctorsResult = await getDoctors(queryString);
  // console.log(doctorsResult);
  const totalPages = Math.ceil(
    doctorsResult?.data?.meta?.total / doctorsResult?.data?.meta?.limit
  );
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader specialities={specialitiesResult?.data || []} />
      <DoctorFilters specialties={specialitiesResult?.data || []} />
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <DoctorsTable
          doctors={doctorsResult?.data?.data}
          specialities={specialitiesResult?.data || []}
        />
        <TablePagination
          currentPage={doctorsResult?.data?.meta?.page || 1}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminDoctorsManagementPage;
