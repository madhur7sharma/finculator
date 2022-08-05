import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export default function Datepicker(props) {
    const nowDate = new Date();
    const todayDate = `${nowDate.getDate()} ${month[nowDate.getMonth()]} ${nowDate.getFullYear()}, ${day[nowDate.getDay()]}`;
    const { defaultDate, date, setDate } = props;
    const formattedDate = new Date(defaultDate);
    const [selectedDate, setSelectedDate] = useState(
        defaultDate ? `${formattedDate.getDate()} ${month[formattedDate.getMonth()]} ${formattedDate.getFullYear()}, ${day[formattedDate.getDay()]}` : todayDate
    );
    const [visibleCalendar, setVisibleCalendar] = useState([]);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(nowDate.getMonth());
    const [selectedMonth, setSelectedMonth] = useState(month[selectedMonthIndex]);
    const [selectedYear, setSelectedYear] = useState(nowDate.getFullYear());

    useEffect(() => {
        if (setDate) {
            setDate(`${selectedYear}-${selectedMonthIndex}-${selectedDate.split(" ")[0]}`);
            // const tempDate = `${selectedYear}-${selectedMonthIndex}-${selectedDate.split(" ")[0]}`;
            // var parts = tempDate.split("-");
            // setDate(new Date(parts[0], parts[1], parts[2]));
        }
    }, [selectedDate]);
    const [open, setOpen] = useState(false);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
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
    useEffect(() => {
        (function calendarCreator(mnth, yr) {
            const monthArr = [];
            let year = 1970,
                monthPtr = 0,
                dayPtr = 4,
                count = 0;
            for (let date = 1; date < 32; date++) {
                count++;
                let leap = false,
                    cMonth = month[monthPtr],
                    cDay = day[dayPtr];
                if (year === yr && cMonth === "December" && date === 31) break;
                if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
                    leap = true;
                }
                if (year === yr && cMonth === mnth) {
                    monthArr.push({ count, date, cDay, cMonth, year });
                }
                dayPtr++;

                if (!["January", "March", "May", "July", "August", "October", "December"].includes(cMonth)) {
                    if (cMonth === "February" && leap && date === 29) {
                        date = 0;
                        monthPtr++;
                    } else if (cMonth === "February" && !leap && date === 28) {
                        monthPtr++;
                        date = 0;
                    } else if (date === 30) {
                        monthPtr++;
                        date = 0;
                    }
                } else if (date === 31) {
                    if (cMonth === "December") {
                        year++;
                    }
                    monthPtr++;
                    date = 0;
                }
                if (monthPtr === 12) {
                    monthPtr = 0;
                }
                if (dayPtr === 7) {
                    dayPtr = 0;
                }
            }
            let dispArr = [];
            let rowArr = [];
            let k = 0;
            for (let i = 0; i < 8; i++) {
                if (day[i] === monthArr[0].cDay) {
                    k = i;
                    for (let j = 0; j < 38; j++) {
                        if (k === 7) {
                            dispArr.push(rowArr);
                            rowArr = [];
                            k = 0;
                        }
                        k++;
                        if (monthArr[j]) {
                            rowArr.push(monthArr[j]);
                        }
                    }
                    break;
                } else {
                    rowArr.push({ count: 0, date: 0, cDay: 0, cMonth: 0, year: 0 });
                }
            }
            setVisibleCalendar(dispArr);
        })(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);
    return (
        <section ref={wrapperRef} className="w-full relative">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} onClick={() => setOpen(!open)} className="inputboxWhite w-full cursor-pointer ">
                <p>{selectedDate}</p>
                <IoIosArrowDown />
            </div>
            {open && (
                <div className="w-full min-h-[220px] text-gray-300 bg-gray-700 absolute top-9 z-50">
                    <div className="flex items-center justify-between px-3 py-2">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center cursor-pointer" onClick={() => setSelectedYear(selectedYear - 1)}>
                                <IoIosArrowBack className="-mr-[10px]" />
                                <IoIosArrowBack />
                            </div>
                            <IoIosArrowBack
                                className="cursor-pointer"
                                onClick={() => {
                                    if (selectedMonthIndex === 0) {
                                        setSelectedMonth(month[11]);
                                        setSelectedMonthIndex(11);
                                        setSelectedYear(selectedYear - 1);
                                    } else {
                                        setSelectedMonth(month[selectedMonthIndex - 1]);
                                        setSelectedMonthIndex(selectedMonthIndex - 1);
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <span>
                                {selectedMonth} {selectedYear}
                            </span>
                        </div>
                        <div className="flex items-center gap-8">
                            <IoIosArrowForward
                                className="cursor-pointer"
                                onClick={() => {
                                    if (selectedMonthIndex === 11) {
                                        setSelectedMonth(month[0]);
                                        setSelectedMonthIndex(0);
                                        setSelectedYear(selectedYear + 1);
                                    } else {
                                        setSelectedMonth(month[selectedMonthIndex + 1]);
                                        setSelectedMonthIndex(selectedMonthIndex + 1);
                                    }
                                }}
                            />
                            <div className="flex items-center cursor-pointer" onClick={() => setSelectedYear(selectedYear + 1)}>
                                <IoIosArrowForward className="-mr-[10px]" />
                                <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                    <div className="px-3 min-w-full inline-block">
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr className="">
                                    <th scope="col" style={{ columnWidth: "100%" }} className="">
                                        Sun
                                    </th>
                                    <th scope="col" style={{ columnWidth: "100%" }} className="">
                                        Mon
                                    </th>
                                    <th scope="col" style={{ columnWidth: "100%" }} className="">
                                        Tue
                                    </th>
                                    <th scope="col" style={{ columnWidth: "100%" }} className="">
                                        Wed
                                    </th>
                                    <th scope="col" style={{ columnWidth: "100%" }} className="">
                                        Thu
                                    </th>
                                    <th scope="col" style={{ columnWidth: "100%" }} className="">
                                        Fri
                                    </th>
                                    <th scope="col" style={{ columnWidth: "100%" }} className="">
                                        Sat
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleCalendar &&
                                    visibleCalendar.map((item, pos) => {
                                        return (
                                            <tr key={pos} className="text-center">
                                                {item.map((item2, pos2) => {
                                                    if (item2.date) {
                                                        return (
                                                            <td
                                                                key={pos2}
                                                                onClick={() => setSelectedDate(`${item2.date} ${selectedMonth} ${selectedYear}, ${item2.cDay}`)}
                                                                className={`cursor-pointer ${
                                                                    todayDate === `${item2.date} ${item2.cMonth} ${item2.year}, ${item2.cDay}`
                                                                        ? "bg-fuchsia-700"
                                                                        : selectedDate === `${item2.date} ${item2.cMonth} ${item2.year}, ${item2.cDay}`
                                                                        ? " bg-blue-800"
                                                                        : "hover:bg-gray-600"
                                                                }`}
                                                            >
                                                                {item2.date ? item2.date : ""}
                                                            </td>
                                                        );
                                                    } else {
                                                        return <td key={pos2}></td>;
                                                    }
                                                })}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
}
