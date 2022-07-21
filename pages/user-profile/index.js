import { getSession } from "next-auth/react";
import PageWrapper from "../../components/pagewrapper";
import fn from "../../helpers/be-functions";

export default function User(props) {
    const { user } = props;
    return (
        <PageWrapper>
            <div className="px-20 py-16 mx-auto bg-red-200-">
                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">{user.name}</h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.
                            </p>
                            <button className="w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img className="w-full h-full lg:max-w-2xl" src="https://merakiui.com/_nuxt/img/Catalogue-pana.32658f1.svg" alt="Catalogue-pana.svg" />
                    </div>
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
