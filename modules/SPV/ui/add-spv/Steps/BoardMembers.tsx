"use client";

import React, { useState } from "react";
import { Building2, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import FormGenerator from "@/components/use-form/FormGenerator";
import { useFormConfig } from "@/modules/SPV/form-config/basicInformation";
import { Button } from "@/components/ui/button";
import BoardMembersTable from "../BoardMembers/BoardTable";
import { mockBoardData } from "@/modules/SPV/mock-data/mock-data-board";
import BoardMembersDialog from "../BoardMembers/BoardMembersDialog";


interface BoardMembersProps {
    spv?: any;
}

const BoardMembers: React.FC<BoardMembersProps> = ({ spv }) => {
    const { reset } = useFormContext<any>();

    const [index, setIndex] = useState<number | null>(-1);
    const [fields, setFields] = useState(mockBoardData);
    const [openBoardMembersDialog, setOpenBoardMembersDialog] = useState(false);

    const onAdd = () => {
        setIndex(-1);
        reset();
        setOpenBoardMembersDialog(true);
    };

    const setDeleteIndex = (rowData: (typeof mockBoardData)[number]) => {
        setFields((prev) => prev.filter((f) => f.a_id !== rowData.a_id));
    };

    return (
        <div className="p-4 rounded-lg">
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Additional Board Members
                </h2>

                <Button onClick={onAdd}>
                    <Plus size={16} /> Add Director
                </Button>
            </div>

            <BoardMembersTable
                fields={fields}
                setIndex={(i) => {
                    setIndex(i);
                    setOpenBoardMembersDialog(true); // 🔥 open on edit
                }}
                setDeleteIndex={setDeleteIndex}
            />
            <BoardMembersDialog
                index={index}
                setIndex={setIndex}
                openBoardMembersDialog={openBoardMembersDialog}
                setOpenBoardMembersDialog={setOpenBoardMembersDialog}
            />
        </div>
    );
};


export default BoardMembers;
