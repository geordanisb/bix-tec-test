'use client'
import {  yearFiltersStore } from "@/appStore";
import { BaseSelectProps, FormControl, MenuItem, Select } from "@mui/material";
import { useAtom } from "jotai";

interface Props extends BaseSelectProps { }
export default function PeriodFilter({ ...others }: Props) {
    const [year, setyear] = useAtom(yearFiltersStore);
    
    const years = [...Array(5)].map((_, idx) => {
        const currentYear = (new Date()).getFullYear();
        return currentYear - idx
    })

    const handleChange = (e: any) => {
        setyear(e.target.value);
    }

    return <FormControl>
        <Select
            labelId="filter-period"
            id="demo-simple-select"
            value={year}
            onChange={handleChange}
            {...others}
        >
            {
                years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)
            }
        </Select>
    </FormControl>
}