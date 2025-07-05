"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n/client";
import { 
  Archive, 
  ChevronDown, 
  Edit, 
  MoreHorizontal, 
  Trash 
} from "lucide-react";
import { mockStudents } from "@/lib/data/mock";
import { EditStudentModal } from "./edit-student-modal";
import { ConfirmationModal } from "./confirmation-modal";

export type Student = {
  id: string;
  name: string;           
  email: string;
  grade: string;
  status: "active" | "archived";
  enrollmentDate: string;
  parentName: string;
  phoneNumber: string;
};

export function StudentsTable() {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  
  // Modal states
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleArchive = (student: Student) => {
    setSelectedStudent(student);
    setIsArchiveModalOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (values: any) => {
    console.log("Saving edited student:", values);
    // Implement save logic here
  };

  const handleConfirmArchive = () => {
    console.log("Archiving student:", selectedStudent?.id);
    // Implement archive logic here
    setIsArchiveModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting student:", selectedStudent?.id);
    // Implement delete logic here
    setIsDeleteModalOpen(false);
  };

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "name",
      header: t("name"),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "grade",
      header: t("grade"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => (
        <div className={row.getValue("status") === "active" ? "text-green-600" : "text-gray-500"}>
          {t(row.getValue("status"))}
        </div>
      ),
    },
    {
      accessorKey: "enrollmentDate",
      header: t("enrollment_date"),
    },
    {
      accessorKey: "parentName",
      header: t("parent_name"),
    },
    {
      accessorKey: "phoneNumber",
      header: t("phone_number"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("open_menu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                onClick={() => handleEdit(student)}
              >
                <Edit className="mr-2 h-4 w-4" />
                {t("edit")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                onClick={() => handleArchive(student)}
              >
                <Archive className="mr-2 h-4 w-4" />
                {t("archive")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => handleDelete(student)}
              >
                <Trash className="mr-2 h-4 w-4" />
                {t("delete")}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: mockStudents,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder={t("filter_name")}
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {t("columns")} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id === "actions" ? t("actions") : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {t("no_results")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="text-sm text-muted-foreground">
            {t("page")} {table.getState().pagination.pageIndex + 1}{" "}
            {t("of")} {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("next")}
          </Button>
        </div>
      </div>

      {/* Modals */}
      <EditStudentModal
        student={selectedStudent}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveEdit}
      />

      <ConfirmationModal
        open={isArchiveModalOpen}
        onOpenChange={setIsArchiveModalOpen}
        onConfirm={handleConfirmArchive}
        title={t("archive_student")}
        description={t("archive_student_confirmation")}
        actionLabel={t("archive")}
      />

      <ConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title={t("delete_student")}
        description={t("delete_student_confirmation")}
        actionLabel={t("delete")}
      />
    </>
  );
}