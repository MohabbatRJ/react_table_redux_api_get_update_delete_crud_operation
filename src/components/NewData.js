import '../App.css';
import React, { useEffect, useMemo } from 'react'
import { useTable, useGlobalFilter, usePagination, useSortBy } from 'react-table'
import GlobalSearch from './GlobalSearch';
import { useDispatch, useSelector } from 'react-redux';
import {actionDeleteData, actionGetData} from '../redux/action/action';
import { Link } from 'react-router-dom';


export default function NewData() {
    const dispatch = useDispatch();

    const responseData = useSelector((state) => state.Reducer.userData)
    console.log("show data", responseData);

    const data = useMemo(() => responseData, [responseData]);

    useEffect(() => {
        dispatch(actionGetData())
    }, [dispatch]);

    const COLUMNS = [
        {
            Header: 'Id',
            accessor: 'id',

        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Price',
            accessor: 'price',
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Images',
            accessor: 'images',
            Cell: ({ cell: { value } }) => (
                <div>
                    <img src={value} alt={value} width={100} />
                </div>)

        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: (cell) => (
                // console.log(cell.row.values.id)
                <div>
                    <button className="bg-light p-2 my-2 rounded-circle border-white border btn-lg">
                    <Link to={`/edit/${cell.row.values.id}`}>
                        ✍️
                    </Link>
                    </button>

                    <button className="bg-light p-2 my-2 rounded-circle border-white border btn-lg" onClick={()=>onDelete(cell.row.values.id)}>
                    <Link to='/'>
                        ❌
                    </Link>
                        </button>
                </div>
            )
        },
    ]
    const columns = useMemo(() => COLUMNS, []);

    const onDelete = (id) =>{
        if (id!==" "){
            dispatch(actionDeleteData(id))
        }
        dispatch(actionGetData())
        
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        // rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    const { pageIndex, pageSize } = state
    const { globalFilter } = state

    return (
        <div>
            <div >
                <button className='btn btn-info mx-2 my-2'></button>

                <GlobalSearch filter={globalFilter} setFilter={setGlobalFilter} />

                <div className='container mt-1' >
                    <h3 className='text-center'>React Table</h3>

                    <table className={`table table-bordered `} {...getTableProps()} >

                        <thead>
                            {
                                headerGroups.map((headerGroup) => (
                                    <tr className='bg-dark text-light' {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map(column => (
                                                <th scope="col" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {
                                                        column.render('Header')
                                                    }
                                                    <span>

                                                        {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ''}
                                                    </span>

                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {
                                page.map((row) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {
                                                row.cells.map((cell) => {
                                                    // console.log('cell',cell)
                                                    return <td {...cell.getCellProps()}>
                                                        {
                                                            cell.render('Cell')
                                                        }
                                                    </td>
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <div className={`container text-center mb-5 p-2 `}>
                        <span className='font-weight-bold'>
                            Page {' '}
                            <span className='font-weight-bold'>
                                {pageIndex + 1} of {pageOptions.length}
                            </span> {' '}
                        </span>

                        <strong className='input-group-sm font-weight-bold'>
                            | Go to Page  {' '}
                            <input className='rounded border-secondary ' type='number' defaultValue={pageIndex + 1} onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }} />
                        </strong>

                        <select className='mx-2 rounded sm border-secondary bg-dark text-light p-1' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [5, 10, 15, 20].map(pageSize => (
                                    <option className='' key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))
                            }
                        </select>

                        <button className='btn btn-dark mx-2 btn-sm font-weight-bold' onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>

                        <button className='btn btn-dark mx-2 btn-sm font-weight-bold' onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>

                        <button className='btn btn-dark mx-2 btn-sm font-weight-bold' onClick={() => nextPage()} disabled={!canNextPage}>Next</button>

                        <button className='btn btn-dark mx-2 btn-sm font-weight-bold' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

