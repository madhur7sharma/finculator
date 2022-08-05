import PageWrapper from "../../components/pagewrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import { useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineExpand } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import SiteContext from "../../helpers/context";
import PlannerDesc from "../../helpers/planner-desc";
import PlannerForm from "../../components/planner-form";
import Modal from "../../components/popup-modal";
import _ from "lodash";
import feFunctions from "../../helpers/fe-function";
import fn from "../../helpers/be-functions";
import Popconfirm from "../../components/pop-confirm";
import { useRouter } from "next/router";
import tui from "../../styles/tailwind-styles";
export default function Planner(props) {
    const { plannerData, userData } = props;
    const [plans, setPlans] = useState(props.plans);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [displayArr, setDisplayArr] = useState([]);
    const [displayArrMod, setDisplayArrMod] = useState([]);
    const [modal, setModal] = useState(false);
    const [expand, setExpand] = useState(false);
    const toast = useContext(SiteContext);
    const router = useRouter();
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
    async function plan(e, request, plan_id) {
        let data;
        if (e) {
            e.preventDefault();
            data = e ? e.target : null;
        }
        try {
            let payload = {};
            if (request !== "DELETE") {
                payload = {
                    address: data.address.value,
                    user_data: {
                        startingCost: data.startingCost.value,
                        inflation: data.inflation.value,
                        startAge: data.startAge.value,
                        endAge: data.endAge.value,
                        startInvestment: data.startInvestment.value,
                        rorInvestment: data.rorInvestment.value,
                    },
                    sip_data: {
                        sipAmount: data.sipAmount.value,
                        startDate: data.startDate.value,
                        fundName: data.fundName.value,
                    },
                };
            }
            if (plan_id) {
                payload._id = plan_id;
            }
            payload = feFunctions.removeEmptyKeys(payload);
            await fetch(`/api/user-api/plan?plannerName=${router.query.plannerName}`, {
                method: request,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (res) => {
                if (res.status === 200) {
                    const dta = await res.json();
                    setModal(false);
                    if (request === "PATCH") {
                        toast("success", "Plan updated successfully!");
                        _.merge(
                            plans.find((item) => item._id == plan_id),
                            dta.data
                        );
                        setPlans([...plans]);
                        setCurrentPlan(null);
                    } else if (request === "POST") {
                        toast("success", "Plan added successfully!");
                        setPlans([...plans.concat(dta.data)]);
                        setCurrentPlan(null);
                    } else if (request === "DELETE") {
                        setExpand(false);
                        toast("success", "Plan deleted successfully!");
                        setPlans([...plans.filter((item) => item._id !== plan_id)]);
                        setCurrentPlan(null);
                    }
                } else {
                    toast("error", "Something went wrong!");
                }
            });
        } catch (error) {
            toast("error", "Something went wrong!");
            console.log(error);
        }
    }

    function editPlan(item) {
        setExpand(false);
        setCurrentPlan(item);
        setModal(true);
    }
    useEffect(() => {
        if (currentPlan) {
            const data = {
                currentcost: {
                    value: currentPlan.user_data.startingCost,
                },
                inflation: { value: currentPlan.user_data.inflation },
                curAge: { value: currentPlan.user_data.startAge },
                futAge: { value: currentPlan.user_data.endAge },
                invest: { value: currentPlan.user_data.startInvestment },
                ror: { value: currentPlan.user_data.rorInvestment },
            };
            let newArr = [];
            plannerData.displayDetails.map((item, pos) => {
                newArr.push({ name: item.name, value: eval(item.value) });
            });
            setDisplayArrMod(newArr);
        }
    }, [currentPlan]);
    function seePlan(item) {
        setCurrentPlan(item);
        setExpand(true);
    }
    return (
        <PageWrapper title={plannerData.name}>
            <div className="">
                <h1 className="font-semibold md:text-[36px] text-[30px] mt-6 mb-10 text-center">{plannerData.name}</h1>
                <div className="flex md:flex-row md:gap-0 gap-12 flex-col-reverse items-center justify-center">
                    <div className="md:w-1/2 w-full">
                        <form id="Form" onSubmit={(e) => calculate(e)} className="flex flex-col justify-center items-center">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 w-full">
                                {plannerData.input.map((item, pos) => {
                                    return <Input className="inputboxBlack" key={pos} {...item} />;
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
                {plans.length > 0 && (
                    <div className="flex flex-col mt-28">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-700 border-b">
                                            <tr>
                                                <th scope="col" className={tui.tableHeading}>
                                                    #
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Address
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Starting Cost
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Inflation
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Start Age
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    End Age
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Starting Investment
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Return on Investments
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Sip Amount
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Start Date
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Fund Name
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {plans.map((item, pos) => (
                                                <tr key={item._id} className={tui.tableRow} onClick={() => seePlan(item)}>
                                                    <td className={tui.tableData}>{pos + 1}</td>
                                                    <td className={tui.tableData}>{item.address}</td>
                                                    <td className={tui.tableData}>{item.user_data.startingCost}</td>
                                                    <td className={tui.tableData}>{item.user_data.inflation}</td>
                                                    <td className={tui.tableData}>{item.user_data.startAge}</td>
                                                    <td className={tui.tableData}>{item.user_data.endAge}</td>
                                                    <td className={tui.tableData}>{item.user_data.startInvestment}</td>
                                                    <td className={tui.tableData}>{item.user_data.rorInvestment}</td>
                                                    <td className={tui.tableData}>{item.sip_data.sipAmount}</td>
                                                    <td className={tui.tableData}>{item.sip_data.startDate}</td>
                                                    <td className={tui.tableData}>{item.sip_data.fundName}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={`${plans.length > 0 ? "mt-12" : "mt-32"} text-center`}>
                <Button
                    onClick={() => {
                        setCurrentPlan(null);
                        setModal(true);
                    }}
                >
                    Add New Plan
                </Button>
            </div>
            <Modal active={modal} cancel={() => setModal(false)}>
                <form id="PlanForm" onSubmit={(e) => plan(e, currentPlan && currentPlan._id ? "PATCH" : "POST", currentPlan && currentPlan._id)}>
                    <Input className="inputboxWhite" defaultValue={currentPlan && currentPlan.address} name={`address`} placeholder={`House Address`} />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.user_data.startingCost}
                        type="number"
                        name={`startingCost`}
                        id={`startingCost`}
                        placeholder={`Starting Cost`}
                    />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.user_data.inflation}
                        type="number"
                        name={`inflation`}
                        id={`inflation`}
                        placeholder={`Inflation`}
                    />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.user_data.startAge}
                        type="number"
                        name={`startAge`}
                        id={`startAge`}
                        placeholder={`Start Age`}
                    />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.user_data.endAge}
                        type="number"
                        name={`endAge`}
                        id={`endAge`}
                        placeholder={`End Age`}
                    />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.user_data.startInvestment}
                        type="number"
                        name={`startInvestment`}
                        id={`startInvestment`}
                        placeholder={`Starting Investment`}
                    />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.user_data.rorInvestment}
                        type="number"
                        name={`rorInvestment`}
                        id={`rorInvestment`}
                        placeholder={`ROR on Investment`}
                    />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.sip_data.sipAmount}
                        type="number"
                        name={`sipAmount`}
                        id={`sipAmount`}
                        placeholder={`Sip Amount`}
                    />
                    <Input
                        className="inputboxWhite"
                        defaultValue={currentPlan && currentPlan.sip_data.startDate}
                        name={`startDate`}
                        id={`startDate`}
                        placeholder={`SIP Start Date`}
                    />
                    <Input className="inputboxWhite" defaultValue={currentPlan && currentPlan.sip_data.fundName} name={`fundName`} id={`fundName`} placeholder={`Fund Name`} />
                    <Button type="submit">{currentPlan ? "Update" : "Add"}</Button>
                </form>
            </Modal>
            <Modal active={expand} title={`Plan Details`} cancel={() => setExpand(false)}>
                {currentPlan && (
                    <section className="flex flex-col justify-center gap-12">
                        <div className="flex items-center justify-center">
                            <div
                                onClick={() => editPlan(currentPlan)}
                                style={{ width: "24px", height: "24px" }}
                                className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center"
                            >
                                <AiOutlineEdit />
                            </div>
                            <Popconfirm okText="Delete" onOk={() => plan(null, "DELETE", currentPlan._id)}>
                                <div style={{ width: "24px", height: "24px" }} className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center">
                                    <AiOutlineDelete />
                                </div>
                            </Popconfirm>
                        </div>
                        <div className="text-black flex flex-wrap items-start justify-between">
                            <div>
                                <h2 className="font-bold">Personal Details</h2>
                                <div className="mt-2">
                                    <p>
                                        <span className="font-medium">Address:</span> {currentPlan.address}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold">Entered Details</h2>
                                <div className="mt-2">
                                    <p>
                                        <span className="font-medium">Starting Cost:</span> {currentPlan.user_data.startingCost}
                                    </p>
                                    <p>
                                        <span className="font-medium">Inflation:</span> {currentPlan.user_data.inflation}
                                    </p>
                                    <p>
                                        <span className="font-medium">Start Age:</span> {currentPlan.user_data.startAge}
                                    </p>
                                    <p>
                                        <span className="font-medium">End Age:</span> {currentPlan.user_data.endAge}
                                    </p>
                                    <p>
                                        <span className="font-medium">ROR on Investment:</span> {currentPlan.user_data.rorInvestment}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold">SIP Details</h2>
                                <div className="mt-2">
                                    <p>
                                        <span className="font-medium">SIP Amount:</span> {currentPlan.sip_data.sipAmount}
                                    </p>
                                    <p>
                                        <span className="font-medium">Start Date:</span> {currentPlan.sip_data.startDate}
                                    </p>
                                    <p>
                                        <span className="font-medium">Fund Name:</span> {currentPlan.sip_data.fundName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-black flex flex-wrap items-start justify-between">
                            <div>
                                <h2 className="font-bold">Calculations</h2>
                                <div className="mt-2">
                                    {displayArrMod.map((item, pos) => {
                                        return (
                                            <p key={pos}>
                                                <span className="font-medium">{item.name}:</span> ₹{item.value}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </Modal>
        </PageWrapper>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login`,
            },
        };
    }
    const { plannerName } = context.params;
    const plannerData = PlannerDesc[plannerName];
    if (!plannerData) {
        return {
            notFound: true,
        };
    }
    const { email } = session.user;
    const userRawData = await fn.user_details(email);
    if (!userRawData) {
        return {
            redirect: {
                permanent: false,
                destination: `/login`,
            },
        };
    }
    const userJsonData = JSON.stringify(userRawData);
    const userData = await JSON.parse(userJsonData);
    const plansData = await fn.get_plans(userRawData.user_id, plannerName);
    const plansJsonData = JSON.stringify(plansData);
    const plans = await JSON.parse(plansJsonData);
    return {
        props: {
            plannerData: plannerData,
            userData: userData,
            plans: plans,
        },
    };
}

{
    /* {plans.length > 0 && (
                    <div className="tableContainer mt-32">
                        <div className="tableRow">
                            <div>
                                <h3>Address</h3>
                            </div>
                            <div>
                                <h3>Starting Cost</h3>
                            </div>
                            <div>
                                <h3>Inflation</h3>
                            </div>
                            <div>
                                <h3>Start Age</h3>
                            </div>
                            <div>
                                <h3>End Age</h3>
                            </div>
                            <div>
                                <h3>Starting Investment</h3>
                            </div>
                            <div>
                                <h3>Return on Investments</h3>
                            </div>
                            <div>
                                <h3>Sip Amount</h3>
                            </div>
                            <div>
                                <h3>Sip Start Data</h3>
                            </div>
                            <div>
                                <h3>Fund Name</h3>
                            </div>
                            <div style={{ width: "36px" }}></div>
                        </div>
                        {plans.map((item, pos) => {
                            return (
                                <div key={item._id} style={{ backgroundColor: "#374151" }} className="tableRow">
                                    <div>
                                        <p>{item.address}</p>
                                    </div>
                                    <div>
                                        <p>{item.user_data.startingCost}</p>
                                    </div>
                                    <div>
                                        <p>{item.user_data.inflation}</p>
                                    </div>
                                    <div>
                                        <p>{item.user_data.startAge}</p>
                                    </div>
                                    <div>
                                        <p>{item.user_data.endAge}</p>
                                    </div>
                                    <div>
                                        <p>{item.user_data.startInvestment}</p>
                                    </div>
                                    <div>
                                        <p>{item.user_data.rorInvestment}</p>
                                    </div>
                                    <div>
                                        <p>{item.sip_data.sipAmount}</p>
                                    </div>
                                    <div>
                                        <p>{item.sip_data.startDate}</p>
                                    </div>
                                    <div>
                                        <p>{item.sip_data.fundName}</p>
                                    </div>
                                    <div style={{ width: "36px" }}>
                                        <Popconfirm
                                            onOk={null}
                                            content={
                                                <div className="flex items-center justify-center">
                                                    <div
                                                        onClick={() => editPlan(item)}
                                                        style={{ width: "24px", height: "24px" }}
                                                        className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center"
                                                    >
                                                        <AiOutlineEdit />
                                                    </div>
                                                    <div
                                                        onClick={() => seePlan(item)}
                                                        style={{ width: "24px", height: "24px" }}
                                                        className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center"
                                                    >
                                                        <AiOutlineExpand />
                                                    </div>
                                                    <Popconfirm okText="Delete" onOk={() => plan(null, "DELETE", item._id)}>
                                                        <div
                                                            style={{ width: "24px", height: "24px" }}
                                                            className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center"
                                                        >
                                                            <AiOutlineDelete />
                                                        </div>
                                                    </Popconfirm>
                                                </div>
                                            }
                                        >
                                            <div style={{ width: "24px", height: "24px" }} className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center">
                                                <BsThreeDotsVertical />
                                            </div>
                                        </Popconfirm>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )} */
}
