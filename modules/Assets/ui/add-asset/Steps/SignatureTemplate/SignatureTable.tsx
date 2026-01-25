import React from "react";
import { Button } from "@/components/ui/button";
import TableComponent from "@/common/TableComponent";
import { EditIcon, TrashIcon } from "lucide-react";

interface SignatureInvestorProps {
  fields: any[];
  actionHandlers: {
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
  };
  update: (index: number, value: any) => void;
}

const SignatureInvestor: React.FC<SignatureInvestorProps> = ({
  fields,
  actionHandlers,
  update,
}) => {
  const columns = [
    {
      header: "Template Id",
      accessorKey: "providerTemplateId",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Template Name",
      accessorKey: "templateName",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Action",
      accessorKey: "action",
      enableResize: false,
      size: 100,
      cell: (info: { row: { original: any }; getValue: () => any }) => {
        const item = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => actionHandlers.onEdit(item)}
            >
              <EditIcon />
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => actionHandlers.onDelete(item)}
            >
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return <TableComponent columns={columns} data={fields} />;
};

export default SignatureInvestor;
