import _ from "lodash";
import { getSession } from "next-auth/react";
import { useContext, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Button from "../../components/button";
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
                    date: data.date.value,
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
    return (
        <PageWrapper title={`Expense Tracker`}>
            {expenses.length > 0 && (
                <div className="flex flex-col mt-28">
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
                                        {expenses.map((item, pos) => (
                                            <tr key={item._id} className={tui.tableRow} onClick={() => seeExpense(item)}>
                                                <td className={tui.tableData}>{pos + 1}</td>
                                                <td className={tui.tableData}>{item.description}</td>
                                                <td className={tui.tableData}>{item.amount}</td>
                                                <td className={tui.tableData}>{item.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                <form id="expenseForm" onSubmit={(e) => expense(e, currentExpense && currentExpense._id ? "PATCH" : "POST", currentExpense && currentExpense._id)}>
                    <Input defaultValue={currentExpense && currentExpense.description} name={`description`} placeholder={`Description`} />
                    <Input defaultValue={currentExpense && currentExpense.amount} name={`amount`} placeholder={`Amount`} />
                    <Input defaultValue={currentExpense && currentExpense.date} type="date" name={`date`} placeholder={`Date`} />
                    <Button type="submit">{currentExpense ? "Update" : "Add"}</Button>
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
                                    <span className="font-medium">{currentExpense.description}:</span> Rs.{currentExpense.amount}/- {currentExpense.date}
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
