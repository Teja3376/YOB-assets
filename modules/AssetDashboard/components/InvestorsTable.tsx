import Pagination from "@/common/Pagination";
import TableComponent from "@/components/TableComponent";


const InvestorTable = ({
  columns,
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
}: any) => {
  return (
    <div className="space-y-4">
      <TableComponent columns={columns} data={data || []} model="investor" />
      <Pagination
        {...pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default InvestorTable;
