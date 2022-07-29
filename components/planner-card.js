import Link from "next/link";
import { IoCalculator } from "react-icons/io5";
import PlannerDesc from "../helpers/planner-desc";

export default function PlannerCard() {
    function calcObject() {
        return Object.entries(PlannerDesc).map(([key, value], i) => {
            return (
                <Link href={`${value.link}`} key={i}>
                    <a>
                        <div className="md:w-[370px] w-[320px]  mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-700">
                            <img style={{ objectFit: "cover" }} className="md:h-[240px] h-[200px] w-full" src={value.image.listingImage} alt="avatar" />

                            <div className="flex items-center px-6 py-3 bg-gray-900">
                                <IoCalculator className="text-2xl" />

                                <h1 className="mx-3 text-lg font-semibold text-white">{value.name}</h1>
                            </div>
                            <div className="px-6 py-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white pb-2">Madhur Sharma</h2>
                                <p className="md:line-clamp-5 line-clamp-3 text-gray-700 dark:text-gray-400">{value.description}</p>
                            </div>
                        </div>
                    </a>
                </Link>
            );
        });
    }
    return <div className="flex flex-wrap items-center justify-center gap-x-[70px] md:gap-y-[120px] gap-y-[80px] max-w-[1300px] mx-auto">{calcObject()}</div>;
}
