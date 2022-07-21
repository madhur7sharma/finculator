import Link from "next/link";
import CalculatorDesc from "../helpers/calculator-desc";

export default function CalculatorCard() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-x-[100px] gap-y-[160px]  max-w-[1300px] mx-auto">
            {CalculatorDesc.map((item, pos) => {
                return (
                    <Link href={`${item.link}`} key={pos}>
                        <a>
                            <div className="w-[360px] h-[420px] bg-gray-500">
                                <p>{item.name}</p>
                            </div>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
}
