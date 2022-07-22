import PageWrapper from "../../components/pagewrapper";
import Input from "../../components/input";
import Button from "../../components/button";
export default function LumpsumCalc(props) {
    return (
        <PageWrapper>
            <div className="text-center">
                <h1>Lumpsum Calculator</h1>
                <div>
                    <div className="grid grid-cols-2 max-w-[50%] mx-auto gap-8">
                        <Input placeholder="Lumpsum amount" />
                        <Input placeholder="Tenure" />
                        <Input placeholder="Rate" />
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-8">
                        <Button className={`bg-emerald-400`}>Calculate</Button>
                        <Button className={`bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800`}>Reset</Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
