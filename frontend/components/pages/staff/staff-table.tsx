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
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n/client";
import { ChevronDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import { mockStaff } from "@/lib/data/mock";
import { EditStaffModal } from "./edit-staff-modal";
import { ConfirmationModal } from "@/components/pages/students/confirmation-modal";
import { cn } from "@/lib/utils";

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  joinDate: string;
  phoneNumber: string;
};

export function StaffTable() {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  
  // Modal states
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  };

  const handleDelete = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (values: any) => {
    console.log("Saving edited staff member:", values);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting staff member:", selectedStaff?.id);
    setIsDeleteModalOpen(false);
  };

  const columns: ColumnDef<StaffMember>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "role",
      header: t("role"),
      cell: ({ row }) => (
        <Badge variant="outline" className="font-normal">
          {row.getValue("role")}
        </Badge>
      ),
    },
    {
      accessorKey: "department",
      header: t("department"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "font-normal",
              status === "active" ? "border-green-500 text-green-500" : "border-gray-500 text-gray-500"
            )}
          >
            {t(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "joinDate",
      header: t("join_date"),
    },
    {
      accessorKey: "phoneNumber",
      header: t("phone_number"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const staff = row.original;

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
                onClick={() => handleEdit(staff)}
              >
                <Edit className="mr-2 h-4 w-4" />
                {t("edit")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => handleDelete(staff)}
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
    data: mockStaff as StaffMember[],
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
      <EditStaffModal
        staff={selectedStaff}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveEdit}
      />

      <ConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title={t("delete_staff")}
        description={t("delete_staff_confirmation")}
        actionLabel={t("delete")}
      />
    </>
  );
}