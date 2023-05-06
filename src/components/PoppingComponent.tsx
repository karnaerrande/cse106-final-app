import React from "react";
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';

export interface dtype {
    val: string,
    yr:string
}

const PoppingComponent: React.FC<{data:dtype}> = ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return <span>
        <button aria-describedby={id} type="button" onClick={handleClick}>
            {data?.val}
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                {data?.yr}
            </Box>
        </Popper>
        </span>
}

export default PoppingComponent;