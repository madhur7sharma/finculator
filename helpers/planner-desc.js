const PlannerDesc = {
    house: {
        name: "Dream House Planner",
        link: "/planner/house",
        image: {
            listingImage: "https://cdn.pixabay.com/photo/2016/09/16/09/21/money-1673582__340.png",
            calcImage: "https://www.finology.in/Calculators/images/CalculatorImage/sip.png",
        },
        input: [
            { name: "currentcost", placeholder: "Current Cost of You Dream House", required: true },
            { name: "inflation", placeholder: "Inflation", required: true },
            { name: "curAge", placeholder: "Current Age", required: true },
            { name: "futAge", placeholder: "Expected Age when you intend to buy", required: true },
            { name: "invest", placeholder: "Amount which you can invest right now", required: true },
            { name: "ror", placeholder: "Expected Investment Returns", required: true },
        ],
        displayDetails: [
            {
                name: "Future cost of you Dream House",
                value: "(data.currentcost.value * Math.pow(1 + data.inflation.value / 100, (data.futAge.value - data.curAge.value))).toFixed(2)",
            },
            {
                name: "Appreciation of investments made today",
                value: "(data.invest.value * Math.pow(1 + data.ror.value / 100, (data.futAge.value - data.curAge.value))).toFixed(2)",
            },
            {
                name: "Deficit Corpus",
                value: "((data.currentcost.value * Math.pow(1 + data.inflation.value / 100, (data.futAge.value - data.curAge.value))).toFixed(2)) - ((data.invest.value * Math.pow(1 + data.ror.value / 100, (data.futAge.value - data.curAge.value))).toFixed(2))",
            },
            {
                name: "Lumpsum funding required for your Dream House",
                value: "",
            },
        ],
    },
    retirement: {
        name: "Retirement Planner",
        link: "/planner/retirement",
        image: {
            listingImage: "https://cdn.pixabay.com/photo/2016/09/16/09/21/money-1673582__340.png",
            calcImage: "https://www.finology.in/Calculators/images/CalculatorImage/sip.png",
        },
    },
};

export default PlannerDesc;
