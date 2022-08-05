import PageWrapper from "../../components/pagewrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import { useState } from "react";
import CalculatorDesc from "../../helpers/calculator-desc";
export default function Calculator(props) {
    const { calData } = props;
    const [fValue, setFValue] = useState(null);
    const [displayArr, setDisplayArr] = useState([]);
    function calculate(e) {
        e.preventDefault();
        const data = e.target;
        setFValue({
            fValue: eval(calData.futureValue),
            earnings: eval(calData.earnings),
        });
        let newArr = [];
        for (const property in calData.displayDetails) {
            newArr.push({ [property]: eval(calData.displayDetails[property]) });
        }
        setDisplayArr(newArr);
    }
    function reset() {
        setDisplayArr([]);
        document.getElementById("Form").reset();
    }

    return (
        <PageWrapper>
            <div className="text-center">
                <h1 className="font-semibold md:text-[36px] text-[30px] mt-6 mb-10">{calData.name}</h1>
                <div className="flex md:flex-row md:gap-0 gap-12 flex-col-reverse items-center justify-center">
                    <div className="md:w-1/2 w-full">
                        <form id="Form" onSubmit={(e) => calculate(e)} className="flex flex-col justify-center items-center">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 w-full">
                                {calData.input.map((item, pos) => {
                                    return <Input className="inputboxBlack" key={pos} name={item.name} placeholder={item.placeholder} />;
                                })}
                            </div>
                            <div className="mt-8 flex items-center justify-center- gap-8">
                                <Button type="submit" className={`bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800`}>
                                    Calculate
                                </Button>
                                <Button onClick={reset} type="button" className={`bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800`}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                        {displayArr && (
                            <div className="mt-8">
                                {displayArr.map((item, pos) => {
                                    return (
                                        <p key={pos}>
                                            {Object.keys(item)[0]} : {Object.values(item)[0]}
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="md:w-1/2 w-full">
                        <img className="md:w-96 w-56 mx-auto" src={calData.image.calcImage} alt="image" />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export async function getServerSideProps(context) {
    const { calName } = context.params;
    const calData = CalculatorDesc[calName];
    if (!calData) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            calData: calData,
        },
    };
}

{
    /* <Input type="number" id="principle" name="principle" placeholder="Principle Amount" />
                            <Input type="number" id="ror" name="ror" placeholder="Expected rate of return" />
                            <Input type="number" id="tenure" name="tenure" placeholder="Tenure" /> */
}
