import _ from "lodash";
import { getSession } from "next-auth/react";
import { useState, useContext } from "react";
import SiteContext from "../../helpers/context";
import Button from "../../components/button";
import Input from "../../components/input";
import CustLink from "../../components/link";
import PageWrapper from "../../components/pagewrapper";
import fn from "../../helpers/be-functions";

export default function EditProfile(props) {
    const { user } = props;
    const [liveItems, setLiveItems] = useState(user);
    const toast = useContext(SiteContext);
    function localChanges(changes) {
        let newData = { ...liveItems };
        _.merge(newData, changes);
        setLiveItems(newData);
    }
    async function updateProfile(e) {
        e.preventDefault();
        try {
            await fetch("/api/user-api/update-user", {
                method: "PATCH",
                body: JSON.stringify(liveItems),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.status === 200) {
                    toast("success", "Profile updated successfully!");
                } else {
                    toast("error", "Something went wrong!");
                }
            });
        } catch (error) {
            toast("error", "Something went wrong!");
            console.log(error);
        }
    }

    return (
        <PageWrapper>
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-sm shadow-gray-600 mt-8 border border-gray-600">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Finculator</h2>

                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Update your profile!</h3>

                    {/* <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p> */}

                    <form onSubmit={(e) => updateProfile(e)} className="pt-6">
                        <div className="w-full mt-4">
                            <label className="formLabel" htmlFor="name">
                                Name
                            </label>
                            <Input
                                value={liveItems.name}
                                onChange={(e) =>
                                    localChanges({
                                        name: e.target.value,
                                    })
                                }
                                id="name"
                                name="name"
                                placeholder="Name"
                            />
                        </div>
                        <div className="w-full mt-4">
                            <label className="formLabel" htmlFor="gender">
                                Gender
                            </label>
                            <Input
                                value={liveItems.gender}
                                onChange={(e) =>
                                    localChanges({
                                        gender: e.target.value,
                                    })
                                }
                                id="gender"
                                name="gender"
                                placeholder="Gender"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </div>
            </div>
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
    const userJsonData = JSON.stringify(userRawData);
    const userData = JSON.parse(userJsonData);
    return {
        props: {
            user: userData,
        },
    };
}
