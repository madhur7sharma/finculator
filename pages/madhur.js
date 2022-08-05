import { useEffect, useState } from "react";
import Datepicker from "../components/datepicker";
import PageWrapper from "../components/pagewrapper";
export default function Madhur() {
    const [date, setDate] = useState(null);
    return (
        <PageWrapper>
            <div className="min-h-[150px]"></div>
            <Datepicker date={date} setDate={setDate} />
            <div className="min-h-[150px]"></div>
        </PageWrapper>
    );
}
