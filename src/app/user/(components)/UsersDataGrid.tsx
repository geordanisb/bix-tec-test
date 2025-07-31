'use client';
import { User } from '@/generated/prisma';
import { Add, Check, Mail } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

type GridColDef<T> = {
    field: string;
    headerName: string;
    width: number;
    render: (ctx: T) => React.ReactNode;
}
export default function UsersDataGrid({ usersPromise }: { usersPromise: Promise<User[]> }) {
    const users = use(usersPromise)
    const columns: GridColDef<User>[] = [
        { field: 'id', headerName: 'ID', width: 90, render: (ctx: User) => <Typography>{ctx.id}</Typography> },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            render: (ctx: User) => <Typography>{ctx.name}</Typography>
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            render: (ctx: User) => <Link href={`mailto:${ctx.email}`} target='_blank'><Typography color='primary'> {ctx.email}</Typography></Link>
        },
        {
            field: 'isAdmin',
            headerName: 'Is Admin?',
            width: 110,
            render: (ctx: User) => <Typography>{ctx.isAdmin ? <Check/> : <></>}</Typography>
        },
        {
            field: 'image',
            headerName: 'Avatar',
            width: 160,
            render: (ctx: User) => <Image src={`https://robohash.org/${ctx.id}` || '/default-avatar.png'} alt="Avatar" width={40} height={40} style={{ width: 40, height: 40, borderRadius: '50%' }} />
        },
    ];

    return <>
        <Button startIcon={<Add />} variant='outlined'><Link href={'/user/create'}>Add</Link></Button>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col.field} style={{ width: col.width, textAlign: 'left', padding: '.5rem' }}>
                                {col.headerName}
                            </TableCell>
                        ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            {columns.map((col) => (
                                <TableCell key={col.field} style={{ width: col.width, textAlign: 'left', padding: '.5rem' }}>
                                    {
                                        col.render 
                                            ? col.render(user) 
                                            : <Typography>{Object.getOwnPropertyDescriptor(user,col as any)?.value}</Typography>
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {/* <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      /> */}
    </>
}