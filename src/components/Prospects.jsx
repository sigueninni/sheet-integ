import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
//Material UI Imports
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    lighten,
} from '@mui/material';

const Prospects = () => {
    //data and fetching state
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);



    //if you want to avoid useEffect, look at the React Query example instead
    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            try {
                const response = await fetch(import.meta.env.VITE_API_BASE_URL);
                const json = await response.json();
                setData(json);
                setRowCount(json.length);
            } catch (error) {
                setIsError(true);
                console.error(error);
                return;
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'Id',
                size: 10,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                size: 100,

                //custom conditional format and styling
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                        sx={(theme) => ({
                            backgroundColor:
                                cell.getValue() == 'Non-conforme'
                                    ? 'red'
                                    : cell.getValue() == 'immigration'
                                        ? 'darkgray'
                                        : cell.getValue() == 'Interessant'
                                            ? '#11734b'
                                            : cell.getValue() == 'à rappeler'
                                                ? '#753800'
                                                : cell.getValue() == 'Sans réponse'
                                                    ? '#ffe5a0'
                                                    : cell.getValue() == 'Pto'
                                                        ? '#0a53a8'
                                                        : cell.getValue() == 'Post'
                                                            ? '#5a3286'
                                                            : '#000',
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {cell.getValue()?.toLocaleString?.('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Box>
                ),

            },
            {
                header: 'Name',
                accessorKey: 'name',
                size: 100,
            },
            {
                header: 'Tel',
                accessorKey: 'tel',
                enableClickToCopy: true,
                size: 150,
            }
            ,
            {
                header: 'City',
                accessorKey: 'city',
                size: 100,
            },
            {
                header: 'Age',
                accessorKey: 'age',
                size: 100,
            },
            {
                header: 'Degree/Experience',
                accessorKey: 'degree-experience',
                size: 100,
            },
            {
                header: 'Msg',
                accessorKey: 'cv',
                size: 300,
            },
            {
                header: 'CV',
                accessorKey: 'cv_link',
                enableClickToCopy: true,
                size: 300,
            },
            {
                header: 'Type',
                accessorKey: 'type',
                size: 100,
            },
            {
                header: 'Owner',
                accessorKey: 'owner',
                size: 100,
            },
            //end
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        initialState: { density: 'compact' },
    });

    return <MaterialReactTable table={table} />;
};

export default Prospects;
