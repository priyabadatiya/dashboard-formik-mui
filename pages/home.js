import * as React from 'react';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Stepper from "../Components/Stepper"


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'userId', headerName: 'UserId', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 300 },

];

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [rows, setRows] = React.useState(null);
    const router = useRouter()
    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setRows(json))
    }, [])


    React.useEffect(() => {
        localStorage.getItem('username') !== "test123" &&
            localStorage.getItem('email') !== "test@gmail.com" &&
            localStorage.getItem('password') !== "12345" && router.push("/")
        console.log("hi")
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div style={{ float: 'right' }}><Button onClick={() => {
                    localStorage.clear();
                    router.push("/")
                }} >LogOut</Button></div>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="KYC" {...a11yProps(1)} />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Stepper />

            </TabPanel>

        </Box>
    );
}
