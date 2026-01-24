import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import TableComponent from "@/common/TableComponent";

interface DocumentsTableProps {
  fields: any[];
  setIndex: (index: number) => void;
  setDeleteIndex: (index: number) => void;
  setEditIndex: (index: number) => void;
  update: (index: number, value: any) => void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  fields,
  setIndex,
  setDeleteIndex,
  setEditIndex,
  update,
}) => {
  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    { header: "Document Type", accessorKey: "type" },
    {
      header: "Is Protected",
      accessorKey: "isProtected",
      cell: ({ row }: any) => {
        const rowData = row.original
        return (
          <Switch
            checked={rowData.isProtected}
            onCheckedChange={(e) =>
              update(row.index, { ...rowData, isProtected: e })
            }
          />
        );
      },
    },
    {
      header: "Is Active",
      accessorKey: "isActive",
      cell: ({ row }: any) => {
        const rowData = row.original
        return (
          <Switch
            checked={rowData.isActive}
            onCheckedChange={(e) =>
              update(row.index, { ...rowData, isActive: e })
            }
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const findIndex = fields.findIndex(
                  (field) => field.document_id === rowData.document_id
                );
                setEditIndex(findIndex);


              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                const findIndex = fields.findIndex(
                  (field) => field.document_id === rowData.document_id
                );
                setDeleteIndex(findIndex);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
      size: 400,
      maxSize: 400,
    },
  ];

  return <TableComponent columns={columns} data={fields} model="document" />;
};

export default DocumentsTable;
