import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { api } from "~/utils/api";
import PoppingComponent, { dtype } from "~/components/PoppingComponent";


type CompanyProps = {
    cid: string;
}
interface InputFeatureData {
    id: number;
    company_id: number;
    feature_id: number;
    feature: {
        id: number;
        label: string;
        name: string;
    };
    val: number;
    yr: number;
}

interface OutputFeatureData {
    feature_id: number;
    label: string;
    name: string;
    data: {
        val: number;
        yr: number;
    }[];
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function TabPanel(props: TabPanelProps) {
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
                    {children}
                </Box>
            )}
        </div>
    );
}
const CompanyPage: NextPage<CompanyProps> = ({ cid }) => {
    const companyData = api.company.getCompany.useQuery(cid);
    const features = api.company.getFeatures.useQuery(cid);
    const [data, setData] = useState<any[]>()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const outputDataMap: Record<number, OutputFeatureData> = {};
        features.data?.forEach((inputItem) => {
            const featureId = inputItem.feature_id;
            let outputItem = outputDataMap[featureId];
            if (!outputItem) {
                outputItem = {
                    feature_id: featureId,
                    label: inputItem.feature.label!,
                    name: inputItem.feature.name!,
                    data: [],
                };
                outputDataMap[featureId] = outputItem;
            }

            outputItem.data.push({
                val: parseInt(inputItem.val),
                yr: parseInt(inputItem.yr),
            });


        });

        console.log(Object.values(outputDataMap))
        setData(Object.values(outputDataMap))
    }, [features.data])

    return (
        <>
          <Button href="/companies">Back</Button>
          <Typography style={{ textAlign: "center" }} variant="h3">
            {companyData.data?.cname}
          </Typography>
          <>
            {data?.map((x: { feature_id?: string; label?: string; data?: any[] }) => (
              <div key={x?.feature_id} style={{ marginLeft: "20px" }}>
                {x?.label}
                <table>
                  <tbody>
                    <tr>
                      {x?.data?.map((y:  dtype ) => (
                        <td key={y?.yr} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                          <PoppingComponent data={y} />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </>
        </>
      );
      
};
CompanyPage.getInitialProps =  ({ query }: NextPageContext): CompanyProps => {
    const cid = query.cid as string;
    return { cid }
};
export default CompanyPage;