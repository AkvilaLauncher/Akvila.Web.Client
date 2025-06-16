'use client';

import { createColumnHelper } from '@tanstack/table-core';
import { ColumnDef } from '@tanstack/react-table';
import { FileX2Icon } from 'lucide-react';

import { DataTableColumnHeader } from '@/entities/Table';
import { ProfileExtendedBaseEntity, ProfileFileBaseEntity } from '@/shared/api/contracts';
import { Checkbox } from '@/shared/ui/checkbox';

enum ColumnHeader {
  NAME = 'Name',
  DIRECTORY = 'File',
  FILE_SIZE = 'File size',
  ADDITIONAL = '',
}

export const columnsHelper = createColumnHelper<ProfileFileBaseEntity>();
export const useColumns = (profile: ProfileExtendedBaseEntity) => {
  const columns: ColumnDef<ProfileFileBaseEntity, any>[] = [
    columnsHelper.display({
      id: 'checkbox',
      size: 48,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all rows"
          className="translate-y-[1px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[-3px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    // columnsHelper.accessor('name', {
    //   size: 500,
    //   header: ({ column }) => <DataTableColumnHeader column={column} title={ColumnHeader.NAME} />,
    //   cell: ({ getValue }) => getValue(),
    // }),
    columnsHelper.accessor('directory', {
      size: 500,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ColumnHeader.DIRECTORY} />
      ),
      cell: ({ getValue }) => getValue(),
    }),
    columnsHelper.accessor('size', {
      size: 500,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ColumnHeader.ADDITIONAL} />
      ),
      cell: ({ row }) => {
        const fileHash = row.original.hash;
        // @ts-ignore
        const fileExists = profile.files.some(
          (file: ProfileFileBaseEntity) => file.hash === fileHash,
        );

        if (!fileExists && fileHash != undefined)
          return (
            <div
              className={`flex items-center gap-2 ${fileExists ? 'text-green-500' : 'text-red-500'} font-bold`}
            >
              <FileX2Icon size="16" />
              File deleted *
            </div>
          );
      },
      enableSorting: false,
      enableColumnFilter: false,
    }),
  ];

  return { columns };
};
