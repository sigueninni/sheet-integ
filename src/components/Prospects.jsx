import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

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
                const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=X2unxqubPsZ_P1Uf-0mQiQabN7ECidAlbqt1fI9_DU0mCeUMOJn6tuO7khiyB0uPTE66FKibU8cNeLf9qPLRw_PrMaaymIpim5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKMC7Edu88AuGKQlZ0ymaRbuurM9-OBz3KzjnTr-81lKLk0lUhI-vX3ufCWg2OeiC1-_ywGnoBy-Cw3Oze4NxcDFp53-cReGLw&lib=M_31ekHVYmqw1T2hxFOgLx8Ti32_F69pn');
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
                header: 'Status',
                accessorKey: 'status'
            },
            {
                header: 'Name',
                accessorKey: 'name'
            },
            {
                header: 'Tel',
                accessorKey: 'tel'
            }
            ,
            {
                header: 'City',
                accessorKey: 'city'
            },
            {
                header: 'Age',
                accessorKey: 'age'
            },
            {
                header: 'Degree/Experience',
                accessorKey: 'degree-experience'
            },
            {
                header: 'Msg',
                accessorKey: 'cv'
            },
            {
                header: 'CV',
                accessorKey: 'cv_link'
            },
            {
                header: 'Type',
                accessorKey: 'type'
            },
            {
                header: 'Owner',
                accessorKey: 'owner'
            },
            //end
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return <MaterialReactTable table={table} />;
};

export default Prospects;
