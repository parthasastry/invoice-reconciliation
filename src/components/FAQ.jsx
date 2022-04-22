import React from "react";

const data = [
    {
        "question": "What is the purpose of this website?",
        "answer": "The invoices sent has aggregated data at bill rate level. Customers request data at individual resource level. This website addressed this issue."
    },
    {
        "question": "How to use this website?",
        "answer": "Download the timecards report from project in salesforce (under Reports link). Upload the file and analyze the data."
    },
    {
        "question": "What are the various views?",
        "answer": "There are two views. One, is a graphical view of invoice, aggregated by billing rate. Second view is a drilldown of first view, provides details at Resource level"
    },
    {
        "question": "Will my data be persisted?",
        "answer": "No, data uploaded is transient and is not persisted"
    },
    {
        "question": "Can I add more views?",
        "answer": "Yes, please reach the author to get guidance"
    },
]

const FAQ = () => {
    return (
        <div name="faq" className="w-full my-32">
            <div className="max-w-[1240px] mx-auto px-2">
                <h2 className="text-3xl font-bold text-center">
                    Frequently Asked Questions (FAQ)
                </h2>
                <div className="grid grid-cols-2 gap-4 p-10 px-2">
                    {data.map((d, i) => {
                        return (
                            <div key={i}>
                                <h3 className="font-bold text-lg">
                                    {d.question}
                                </h3>
                                <p className="text-lg pt-2 pb-4">
                                    {d.answer}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQ;