import { getSession } from "next-auth/react";
import fn from "../../helpers/be-functions";
import PageWrapper from "../../components/pagewrapper";

export default function Verification(props) {
    const { verified } = props;
    return (
        <PageWrapper>
            <p>{verified ? "User Verified Successfully" : "Something went wrong"}</p>
        </PageWrapper>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { userId } = context.query;
    const verify = await fn.verify_user(userId);
    if (verify) {
        return {
            props: {
                verified: true,
            },
        };
    }
    return {
        props: {
            verified: false,
        },
    };
}
