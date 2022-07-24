const CalculatorDesc = {
    lumpsum: {
        name: "Lumpsum Calculator",
        link: "/calculators/lumpsum",
        displayDetails: {
            futureValue: "(data.principle.value * Math.pow(1 + data.ror.value / 100, data.tenure.value)).toFixed(2)",
            earnings: "(data.principle.value * Math.pow(1 + data.ror.value / 100, data.tenure.value) - data.principle.value).toFixed(2)",
        },
        input: [
            { name: "principle", placeholder: "Principle amount" },
            { name: "ror", placeholder: "Rate of return" },
            { name: "tenure", placeholder: "Tenure" },
        ],
        image: {
            listingImage: "https://cdn.pixabay.com/photo/2016/09/16/09/21/money-1673582__340.png",
            calcImage: "https://www.finology.in/Calculators/images/CalculatorImage/sip.png",
        },
        description:
            "Lumpsum investment or one-time investment is a style of investment in which you invest once (lumpsum) and allow your invested money to generate compounding returns over a given time frame.",
    },
    sip: {
        name: "Sip Calculator",
        link: "/calculators/sip",
        displayDetails: {
            futureValue:
                "(data.principle.value * (1+(data.ror.value/12/100)) * ((Math.pow((1+(data.ror.value/12/100)),(data.tenure.value*12))) - 1)/(data.ror.value/12/100)).toFixed(2)",
            earnings:
                "((data.principle.value * (1+(data.ror.value/12/100)) * ((Math.pow((1+(data.ror.value/12/100)),(data.tenure.value*12))) - 1)/(data.ror.value/12/100)) - data.principle.value).toFixed(2)",
        },
        input: [
            { name: "principle", placeholder: "Principle amount" },
            { name: "ror", placeholder: "Rate of return" },
            { name: "tenure", placeholder: "Tenure" },
            { name: "frequency", placeholder: "Frequency" },
        ],
        image: {
            listingImage: "https://cdn.pixabay.com/photo/2016/01/10/19/02/money-1132279__340.png",
            calcImage: "https://www.finology.in/Calculators/images/CalculatorImage/sip.png",
        },
        description:
            "Systematic Investment Plan or SIP is the most disciplined style of investment in which a fixed amount of money is invested at regular intervals (yearly, quarterly, monthly). For SIP you will have to decide the investment amount, the SIP date and the scheme in which you want to invest.",
    },
    cagr: {
        name: "CAGR Calculator",
        link: "/calculators/cagr",
        displayDetails: {
            futureValue: "(((Math.pow((data.futureValue.value/data.principle.value) , (1/data.tenure.value))) - 1)*100).toFixed(2)",
            earnings: "((((Math.pow((data.futureValue.value/data.principle.value) , (1/data.tenure.value))) - 1)*100) - data.principle.value).toFixed(2)",
        },
        input: [
            { name: "principle", placeholder: "Principle amount" },
            { name: "futureValue", placeholder: "Future Value" },
            { name: "tenure", placeholder: "Tenure" },
        ],

        image: {
            listingImage: "https://cdn.pixabay.com/photo/2019/10/18/19/51/financial-4560047__340.jpg",
            calcImage: "https://www.finology.in/Calculators/images/CalculatorImage/sip.png",
        },
        description:
            "CAGR stands for Compounded Annual Growth Rate. In the finance field it is commonly used as CAGR while determining returns. CAGR is the average rate at which an investment grows yearly over the period of time. You can calculate the CAGR return for your investment in Finology’s CAGR Calculator.",
    },
    absolutereturns: {
        name: "Absolute Return Calculator",
        link: "/calculators/absolutereturns",
        input: [
            { name: "principle", placeholder: "Enter absolute returns" },
            { name: "tenure", placeholder: "Tenure" },
        ],
        image: {
            listingImage: "https://cdn.pixabay.com/photo/2017/06/07/12/05/financing-2380158__340.jpg",
            calcImage: "https://www.finology.in/Calculators/images/CalculatorImage/sip.png",
        },
        displayDetails: {
            futureValue: "(((Math.pow(((data.principle.value/100)+1),(1/(data.tenure.value))))-1)*100).toFixed(2)",
        },
        description:
            "Absolute returns calculator Absolute returns calculator Absolute returns calculator Absolute returns calculator Absolute returns calculator Absolute returns calculator Absolute returns calculator Absolute returns calculator",
    },
    emi: {
        name: "EMI Calculator",
        link: "/calculators/emi",
        input: [
            { name: "principle", placeholder: "Principle amount" },
            { name: "ror", placeholder: "Future Value" },
            { name: "tenure", placeholder: "Tenure" },
        ],
        image: {
            listingImage: "https://cdn.pixabay.com/photo/2019/11/23/09/25/marketing-4646598__340.png",
            calcImage: "https://www.finology.in/Calculators/images/CalculatorImage/sip.png",
        },
        displayDetails: {
            EMI: "(data.principle.value * (data.ror.value/1200) * ((Math.pow((1+(data.ror.value/1200)),(data.tenure.value * 12)))/((Math.pow((1+(data.ror.value/1200)),(data.tenure.value * 12))) - 1))).toFixed(2)",
        },
        description:
            "The loan which is taken to cover the fees and expenses of higher studies is known as education loan. It covers the cost of tuition and course fee, exam fees, deposits and costs of books, hostel, etc. Most of the reputed institutions charge hefty fees for admission which can’t be afforded by many students and their family. Education loans helps that families to give their child the best education irrespective of the cost.",
    },
};

export default CalculatorDesc;
