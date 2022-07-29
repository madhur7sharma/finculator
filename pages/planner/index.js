import _ from "lodash";
import { getSession } from "next-auth/react";
import { useState, useContext } from "react";
import SiteContext from "../../helpers/context";
import Button from "../../components/button";
import Input from "../../components/input";
import CustLink from "../../components/link";
import PageWrapper from "../../components/pagewrapper";
import fn from "../../helpers/be-functions";
import PlannerCard from "../../components/planner-card";

export default function Planners(props) {
    const { user } = props;
    const toast = useContext(SiteContext);

    return (
        <PageWrapper>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl my-16">Financial Planning at a Glance!</h1>
                <PlannerCard />
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
