import { GrClose } from "react-icons/gr";
import Button from "./button";
export default function Modal(props) {
    const { active = false, cancel, title = "Title" } = props;
    return (
        <>
            {active && (
                <div className="fixed top-0 right-0 bottom-0 left-0">
                    <div className="w-screen h-screen bg-black opacity-70"></div>
                    <div className="w-[95%] lg:w-[80%] xl:w-[70%] absolute bg-white transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[100]">
                        <div className="border border-b w-full py-2 px-8 flex items-center justify-between gap-3">
                            <p className="text-black font-semibold text-[18px]">{title}</p>
                            <GrClose onClick={cancel} className="text-black cursor-pointer font-medium" />
                        </div>
                        <div className="py-4 px-8 max-h-[70vh]">{props.children}</div>
                        <div className="border border-t w-full py-2 px-8 flex justify-end gap-3">
                            <Button onClick={cancel}>Cancel</Button>
                            <Button>Ok</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
