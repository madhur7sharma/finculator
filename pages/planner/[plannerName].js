import PageWrapper from "../../components/pagewrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import { useState } from "react";
import PlannerDesc from "../../helpers/planner-desc";
import PlannerForm from "../../components/planner-form";
import Modal from "../../components/popup-modal";
export default function Planner(props) {
    const { plannerData } = props;
    const [displayArr, setDisplayArr] = useState([]);
    const [modal, setModal] = useState(false);
    function calculate(e) {
        e.preventDefault();
        const data = e.target;
        let newArr = [];
        plannerData.displayDetails.map((item, pos) => {
            newArr.push({ name: item.name, value: eval(item.value) });
        });
        setDisplayArr(newArr);
    }
    function reset() {
        setDisplayArr([]);
        document.getElementById("Form").reset();
    }

    return (
        <PageWrapper>
            <div className="text-center">
                <h1 className="font-semibold md:text-[36px] text-[30px] mt-6 mb-10">{plannerData.name}</h1>
                <div className="flex md:flex-row md:gap-0 gap-12 flex-col-reverse items-center justify-center">
                    <div className="md:w-1/2 w-full">
                        <form id="Form" onSubmit={(e) => calculate(e)} className="flex flex-col justify-center items-center">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 w-full">
                                {plannerData.input.map((item, pos) => {
                                    return <Input key={pos} {...item} />;
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
                                            {item.name} : {item.value}
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="md:w-1/2 w-full">
                        <img className="md:w-96 w-56 mx-auto" src={plannerData.image.calcImage} alt="image" />
                    </div>
                </div>
                <div className="mt-32">
                    <Button onClick={() => setModal(true)}>Add New Plan</Button>
                    <Modal active={modal} cancel={() => setModal(false)}>
                        <Input placeholder={`House Address`} />
                    </Modal>
                </div>
            </div>
        </PageWrapper>
    );
}

export async function getServerSideProps(context) {
    const { plannerName } = context.params;
    const plannerData = PlannerDesc[plannerName];
    if (!plannerData) {
        return {
            notFound: true,
        };
    }
    return {
        props: { plannerData: plannerData },
    };
}
