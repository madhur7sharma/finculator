import CalculatorCard from "../../components/calc-card";
import PageWrapper from "../../components/pagewrapper";

export default function Calculators() {
    return (
        <PageWrapper>
            <h1 className="md:text-[40px] text-[36px] font-medium my-10 text-center">Financial Calculators</h1>
            <CalculatorCard />
        </PageWrapper>
    );
}
