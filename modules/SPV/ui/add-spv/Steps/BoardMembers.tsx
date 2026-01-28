"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import BoardMembersTable from "../BoardMembers/BoardTable";
import BoardMembersDialog from "../BoardMembers/BoardMembersDialog";
import {useABApi} from "@/hooks/spv/useBoardD";
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
    const { fields, append, remove, update } = useFieldArray({
        name: "boardMembers",
        control,
        keyName: "a_id",
    });
    const addBoardMember = () => {
        setIndex(-1);
        reset()
    };
    const isDelete = deleteIndex !== null;
    const onSubmit = async () => {
        if (deleteIndex !== null) {
          const findIndex = fields.findIndex(
            (field) => field.a_id === deleteIndex.a_id
          );
          remove(findIndex);
          await deleteAB(deleteIndex._id);
          setDeleteIndex(null);
        }
      };


    return (
        <div className="p-4 rounded-lg">
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Additional Board Members
                </h2>

                <Button onClick={addBoardMember}>
                    <Plus size={16} /> Add Director
                </Button>
            </div>

            <BoardMembersTable
                fields={fields}
                setIndex={setIndex}
                setDeleteIndex={setDeleteIndex}
            />
            
            <BoardMembersDialog
                fields={fields}
                index={index}
                append={append}
                update={update}
                remove={remove}
                setIndex={setIndex}
            />

            {/* <AlertDialog open={isDelete} onOpenChange={onOpenChange}>
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
            </AlertDialog> */}
        </div>
    );
};

export default BoardMembers;
