import _ from "lodash";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Button from "../../components/button";
import Datepicker, { month } from "../../components/datepicker";
import Input from "../../components/input";
import PageWrapper from "../../components/pagewrapper";
import Popconfirm from "../../components/pop-confirm";
import Modal from "../../components/popup-modal";
import fn from "../../helpers/be-functions";
import SiteContext from "../../helpers/context";
import feFunctions from "../../helpers/fe-function";
import tui from "../../styles/tailwind-styles";

export default function ExpenseTracker(props) {
    const toast = useContext(SiteContext);
    const [modal, setModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [expenses, setExpenses] = useState(props.expenses);
    const [expand, setExpand] = useState(false);
    const [date, setDate] = useState(null);
    const [filter, setFilter] = useState(false);
    const [minRange, setMinRange] = useState(null);
    const [maxRange, setMaxRange] = useState(null);
    const [filterMonth, setFilterMonth] = useState(null);
    const [filterYear, setFilterYear] = useState(null);
    const [filterDate, setFilterDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    async function expense(e, request, expense_id) {
        let data;
        if (e) {
            e.preventDefault();
            data = e ? e.target : null;
        }
        try {
            let payload = {};
            if (request !== "DELETE") {
                payload = {
                    description: data.description.value,
                    amount: data.amount.value,
                    date: date,
                };
            }
            if (expense_id) {
                payload._id = expense_id;
            }
            payload = feFunctions.removeEmptyKeys(payload);
            await fetch(`/api/user-api/expense`, {
                method: request,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (res) => {
                if (res.status === 200) {
                    const dta = await res.json();
                    if (request === "PATCH") {
                        setModal(false);
                        toast("success", "Plan updated successfully!");
                        _.merge(
                            expenses.find((item) => item._id == expense_id),
                            dta.data
                        );
                        setExpenses([...expenses]);
                        setCurrentExpense(null);
                    } else if (request === "POST") {
                        setModal(false);
                        toast("success", "Plan added successfully!");
                        setExpenses([...expenses.concat(dta.data)]);
                        setCurrentExpense(null);
                    } else if (request === "DELETE") {
                        setExpand(false);
                        toast("success", "Plan deleted successfully!");
                        setExpenses([...expenses.filter((item) => item._id !== expense_id)]);
                        setCurrentExpense(null);
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
    function editExpense(item) {
        setExpand(false);
        setCurrentExpense(item);
        setModal(true);
    }
    function seeExpense(item) {
        setCurrentExpense(item);
        setExpand(true);
    }
    useEffect(() => {
        let sum = 0;
        expenses.map((item) => {
            sum += item.amount;
        });
        setTotalAmount(sum);
    }, [expenses]);
    return (
        <PageWrapper title={`Expense Tracker`}>
            {expenses.length > 0 && (
                <div className="my-28 mb-36">
                    <div className="w-[320px] relative">
                        <Button onClick={() => setFilter(!filter)}>Filter</Button>
                        {filter && (
                            <div className="absolute top-10 h-[380px] w-full flex flex-col gap-3 bg-lime-100 p-4">
                                <div>
                                    <label className="text-black" for="minRange">
                                        Minimum Range
                                    </label>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Input
                                            type="number"
                                            className="inputboxWhite"
                                            onChange={(e) => setMinRange(e.target.value)}
                                            value={minRange}
                                            id="minRange"
                                            name="minRange"
                                            placeholder="Enter Minimum Range"
                                        />
                                        <Button onClick={() => setMinRange("")}>Clear</Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-black" for="maxRange">
                                        Maximum Range
                                    </label>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Input
                                            type="number"
                                            className="inputboxWhite"
                                            onChange={(e) => setMaxRange(e.target.value)}
                                            value={maxRange}
                                            id="maxRange"
                                            name="maxRange"
                                            placeholder="Enter Maximum Range"
                                        />
                                        <Button onClick={() => setMaxRange("")}>Clear</Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-black">Month</label>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <select style={{ width: 200 }} onChange={(e) => setFilterMonth(e.target.value)} value={filterMonth} className="inputboxWhite">
                                            <option hidden value="def">
                                                Select Month
                                            </option>
                                            {month.map((mnt, pos) => (
                                                <option value={mnt} key={pos}>
                                                    {mnt}
                                                </option>
                                            ))}
                                        </select>
                                        <Button onClick={() => setFilterMonth("def")}>Clear</Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-black">Date</label>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <select style={{ width: 200 }} onChange={(e) => setFilterDate(e.target.value)} value={filterDate} className="inputboxWhite">
                                            <option hidden value="def">
                                                Select Date
                                            </option>
                                            {Array.from(Array(31).keys()).map((dt, pos) => (
                                                <option value={dt + 1} key={pos}>
                                                    {dt + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <Button onClick={() => setFilterDate("def")}>Clear</Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-black">Year</label>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <select style={{ width: 200 }} onChange={(e) => setFilterYear(e.target.value)} value={filterYear} className="inputboxWhite">
                                            <option hidden value="def">
                                                Select Year
                                            </option>
                                            {Array.from(Array(30).keys()).map((yr, pos) => (
                                                <option value={yr + 2001} key={pos}>
                                                    {yr + 2001}
                                                </option>
                                            ))}
                                        </select>
                                        <Button onClick={() => setFilterYear("def")}>Clear</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-600 border-b">
                                            <tr>
                                                <th scope="col" className={tui.tableHeading}>
                                                    #
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Description
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Amount
                                                </th>
                                                <th scope="col" className={tui.tableHeading}>
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expenses
                                                .filter((x) => {
                                                    let conf = true;
                                                    const formattedDate = new Date(x.date);
                                                    if (filterMonth && filterMonth !== "def") {
                                                        if (month[formattedDate.getMonth()] === filterMonth) conf = true;
                                                        else return false;
                                                    }
                                                    if (filterYear && filterYear !== "def") {
                                                        if (formattedDate.getFullYear() == filterYear) conf = true;
                                                        else return false;
                                                    }
                                                    if (filterDate && filterDate !== "def") {
                                                        if (formattedDate.getDate() == filterDate) conf = true;
                                                        else return false;
                                                    }
                                                    if (minRange) {
                                                        if (x.amount >= minRange) conf = true;
                                                        else return false;
                                                    }
                                                    if (maxRange) {
                                                        if (x.amount <= maxRange) conf = true;
                                                        else return false;
                                                    }
                                                    if (conf) return true;
                                                })
                                                .map((item, pos) => (
                                                    <tr key={item._id} className={tui.tableRow} onClick={() => seeExpense(item)}>
                                                        <td className={tui.tableData}>{pos + 1}</td>
                                                        <td className={tui.tableData}>{item.description}</td>
                                                        <td className={tui.tableData}>₹ {item.amount}/-</td>
                                                        <td className={tui.tableData}>{new Date(item.date).toDateString("en-US")}</td>
                                                    </tr>
                                                ))}
                                            <tr className={tui.tableRow}>
                                                <td className={tui.tableData}></td>
                                                <td className={tui.tableData}></td>
                                                <td className={tui.tableData}>Total - ₹ {totalAmount}/-</td>
                                                <td className={tui.tableData}></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${expenses.length > 0 ? "mt-12" : "mt-32"} text-center`}>
                <Button
                    onClick={() => {
                        setCurrentExpense(null);
                        setModal(true);
                    }}
                >
                    Add New Expense
                </Button>
            </div>
            <Modal active={modal} cancel={() => setModal(false)}>
                <form id="expenseForm" onSubmit={(e) => expense(e, currentExpense && currentExpense._id ? "PATCH" : "POST", currentExpense && currentExpense._id)} className="">
                    <div className="max-w-[300px] mx-auto flex flex-col gap-6">
                        <Input className="inputboxWhite" defaultValue={currentExpense && currentExpense.description} name={`description`} placeholder={`Description`} />
                        <Input className="inputboxWhite" defaultValue={currentExpense && currentExpense.amount} name={`amount`} placeholder={`Amount`} />
                        {/* <Input defaultValue={currentExpense && currentExpense.date} type="date" name={`date`} placeholder={`Date`} /> */}
                        <Datepicker defaultDate={currentExpense && currentExpense.date} date={date} setDate={setDate} />
                        <Button type="submit">{currentExpense ? "Update" : "Add"}</Button>
                    </div>
                </form>
            </Modal>
            <Modal active={expand} title={`Plan Details`} cancel={() => setExpand(false)}>
                {currentExpense && (
                    <section className="text-black flex flex-col justify-center gap-12">
                        <div className="flex items-center justify-center">
                            <div
                                onClick={() => editExpense(currentExpense)}
                                style={{ width: "24px", height: "24px" }}
                                className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center"
                            >
                                <AiOutlineEdit />
                            </div>
                            <Popconfirm okText="Delete" onOk={() => expense(null, "DELETE", currentExpense._id)}>
                                <div style={{ width: "24px", height: "24px" }} className="mx-auto bg-gray-500 cursor-pointer flex items-center justify-center">
                                    <AiOutlineDelete />
                                </div>
                            </Popconfirm>
                        </div>
                        <div>
                            <div className="mt-2">
                                <p>
                                    <span className="font-medium">{currentExpense.description}:</span> Rs.{currentExpense.amount}/-{" "}
                                    {new Date(currentExpense.date).toDateString("en-US")}
                                </p>
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
    const { email } = session.user;
    const userRawData = await fn.user_details(email);
    if (!userRawData) {
        return {
            notFound: true,
        };
    }
    const userJsonData = JSON.stringify(userRawData);
    const userData = await JSON.parse(userJsonData);
    const expenseData = await fn.get_expenses(userRawData.user_id);
    const expenseJsonData = JSON.stringify(expenseData);
    const expenses = await JSON.parse(expenseJsonData);
    return {
        props: {
            expenses: expenses,
            userData: userData,
        },
    };
}

// if (filterMonth) {
//     const formattedDate = new Date(x.date);
//     if (month[formattedDate.getMonth()] === filterMonth) return true;
// } else return true;
