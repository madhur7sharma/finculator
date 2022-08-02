import { useEffect, useRef, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";

export default function Popconfirm(props) {
    const {
        onOk,
        onCancel = () => setPopCon(false),
        cancelText = "Cancel",
        okText = "Ok",
        content = (
            <div style={{ width: "100%" }} className="flex items-center">
                <span>
                    <AiOutlineWarning className="text-yellow-500 text-lg" />
                </span>
                <span className="text-black">Are you sure you want to delete this section?</span>
            </div>
        ),
    } = props;
    const [popCon, setPopCon] = useState(false);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setPopCon(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <section className="relative">
            <div style={{ width: "36px" }} className="overflow-hidden" onClick={() => setPopCon(true)}>
                {props.children}
            </div>
            {popCon && (
                <div
                    ref={wrapperRef}
                    style={{ height: 110, width: 240 }}
                    className="bg-white px-2 absolute rounded border transform -translate-y-1/2 -translate-x-full shadow-lg flex flex-col items-center justify-center gap-4 text-center"
                >
                    {content}
                    <div className="flex items-center justify-center gap-4">
                        <button onClick={onCancel} style={{ width: 65 }} className="text-sm px-2 py-1 bg-transparent text-black border border-gray-500 rounded-md">
                            {cancelText}
                        </button>
                        {onOk !== null && (
                            <button onClick={onOk} style={{ width: 65 }} className="text-sm px-2 py-1 bg-transparent border border-red-500 rounded-md text-red-500">
                                {okText}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
