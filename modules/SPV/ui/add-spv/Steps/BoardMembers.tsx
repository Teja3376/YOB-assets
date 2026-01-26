"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import BoardMembersTable from "../BoardMembers/BoardTable";
import BoardMembersDialog from "../BoardMembers/BoardMembersDialog";
import { useABApi } from "@/hooks/spv/useABApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BoardMembersProps {
    spv?: any;
}

const BoardMembers: React.FC<BoardMembersProps> = ({ spv }) => {
    const { control, reset } = useFormContext<any>();
    const { deleteAB } = useABApi();
    const [index, setIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<any | null>(null);
    const [openBoardMembersDialog, setOpenBoardMembersDialog] = useState(false);

    const { fields, append, remove, update } = useFieldArray({
        name: "boardMembers",
        control,
        keyName: "a_id",
    });

    const onAdd = () => {
        // Append a temporary empty item for the new board member
        const tempIndex = fields.length;
        append({
            fullName: "",
            email: "",
            countryCode: "",
            phoneNumber: "",
            idNumber: "",
            idProof: null,
            role: "",
        });
        setIndex(tempIndex);
        setOpenBoardMembersDialog(true);
    };

    const isDelete = deleteIndex !== null;

    const onOpenChange = () => {
        setDeleteIndex(null);
    };

    const onDelete = async () => {
        if (deleteIndex !== null) {
            const findIndex = fields.findIndex(
                (field) => field.a_id === deleteIndex.a_id
            );
            if (findIndex !== -1) {
                remove(findIndex);
                if (deleteIndex._id) {
                    await deleteAB(deleteIndex._id);
                }
            }
            setDeleteIndex(null);
        }
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
                    setOpenBoardMembersDialog(true);
                }}
                setDeleteIndex={setDeleteIndex}
            />
            
            <BoardMembersDialog
                index={index}
                setIndex={setIndex}
                openBoardMembersDialog={openBoardMembersDialog}
                setOpenBoardMembersDialog={setOpenBoardMembersDialog}
                fields={fields}
                append={append}
                update={update}
                remove={remove}
            />

            <AlertDialog open={isDelete} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the board member.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onOpenChange}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default BoardMembers;
