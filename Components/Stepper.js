import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [email, setEmail] = React.useState(localStorage.getItem('email'));
    const [idIndex, setIdIndex] = React.useState(localStorage.getItem('idIndex'));
    const [idNumber, setIdNumber] = React.useState(localStorage.getItem('idNumber'));

    const handleNext = () => {
        if (activeStep === 2) {
            localStorage.setItem("idIndex", idIndex)
            localStorage.setItem("idNumber", idNumber)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChange = (event) => {
        setIdIndex(event.target.value);
    };
    const steps = [
        {
            label: 'Input your email',
            description: <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        },
        {
            label: 'Select your ID',
            description:
                <>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">ID Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idIndex}
                            label="ID Type"
                            onChange={handleChange}
                        >

                            <MenuItem value={1}>Voter ID</MenuItem>
                            <MenuItem value={2}>Driving License</MenuItem>
                            <MenuItem value={3}>Aadhar Card</MenuItem>
                        </Select>
                    </FormControl>
                    {idIndex && <TextField id="outlined-basic" label="ID No." variant="outlined" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                    }
                </>
        },
        {
            label: 'Review',
            description: <>
                <TextField disabled={true} fullWidth sx={{ mb: 2 }} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormControl disabled fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="demo-simple-select-label">ID Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={idIndex}
                        label="ID Type"
                        onChange={handleChange}
                    >

                        <MenuItem value={1}>Voter ID</MenuItem>
                        <MenuItem value={2}>Driving License</MenuItem>
                        <MenuItem value={3}>Aadhar Card</MenuItem>
                    </Select>
                </FormControl>
                {idIndex && <TextField disabled={true} id="outlined-basic" label="ID No." variant="outlined" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />}
            </>
        },
    ];

    return (
        <Box sx={{ maxWidth: 700 }}>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>


                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>


                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - Last Updated Data</Typography>

                    <TextField disabled={true} fullWidth sx={{ mb: 2 }} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormControl disabled fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">ID Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idIndex}
                            label="ID Type"
                            onChange={handleChange}
                        >

                            <MenuItem value={1}>Voter ID</MenuItem>
                            <MenuItem value={2}>Driving License</MenuItem>
                            <MenuItem value={3}>Aadhar Card</MenuItem>
                        </Select>
                    </FormControl>

                    {idIndex && <TextField disabled={true} id="outlined-basic" label="ID No." variant="outlined" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />}
                    {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button> */}
                </Paper>
            )}
        </Box>
    );
}
