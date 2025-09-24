import { Step, StepLabel, Stepper } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { formatDate } from "../../../utils/functions";

const Tracker = ({ activeStep, orderOn }) => {
    const steps = [
        {
            status: "Ordered",
            dt: formatDate(orderOn),
        },
        {
            status: "Shipped",
        },
        {
            status: "Out For Delivery",
        },
        {
            status: "Delivered",
        },
    ];

    const completedIcon = (
        <span className="text-green-400 animate-pulse">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );
    const pendingIcon = (
        <span className="text-gray-400">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );

    return (
        <div className="w-full px-2 py-6 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl shadow border border-gray-800">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps?.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            icon={activeStep >= index ? completedIcon : pendingIcon}
                        >
                            {activeStep >= index ? (
                                <span className="text-green-400 font-medium">
                                    {item.status}
                                </span>
                            ) : (
                                <span className="text-gray-400 font-medium">
                                    {item.status}
                                </span>
                            )}
                            {item.dt && (
                                <span className="block text-xs text-indigo-300 mt-1">
                                    {item.dt}
                                </span>
                            )}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default Tracker;
