import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const numberFormat = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc;
    }, {})
}

const DisplayData = ({ data }) => {

    const [invoice, setInvoice] = useState("")

    const handleChange = (event) => {
        setInvoice(event.target.value);
    };

    const consolidatedDataByInvoice = groupBy(data, "Invoice Number")

    let invoicesList = Object.keys(consolidatedDataByInvoice)
    // Remove blank Invoice Number
    invoicesList = invoicesList.filter(invoice => invoice !== "").reverse()

    let selectedInvoiceData = invoice ? consolidatedDataByInvoice[invoice] : []
    let billRateAggregated = groupBy(selectedInvoiceData, "Bill Rate")

    let billRates = Object.keys(billRateAggregated);

    let chartData = billRates.map(rate => {
        const data = billRateAggregated[rate]
        const totalAmount = data.reduce((a, b) => a + Number(b["Total Billable Amount"]), 0)
        return totalAmount
    })


    const displayData = {
        labels: billRates,
        datasets: [
            {
                label: "Invoiced Amount($)",
                data: chartData,
                backgroundColor: ["rgba(99, 99, 132, 0.8)"],
                borderColor: ["rgba(99, 99, 132, 0.8)"],
            },
        ],
    };

    const invoiceDataByResource = billRates.map(rate => {
        const resourceData = billRateAggregated[rate];
        let resourceAggregated = groupBy(resourceData, "Resource");
        let resources = Object.keys(resourceAggregated);
        let data = resources.map(resource => {
            const data = resourceAggregated[resource]
            const totalAmount = data.reduce((a, b) => a + Number(b["Total Billable Amount"]), 0)
            return { "Resource": resource, "Amount": totalAmount }
        })
        return { "Bill Rate": rate, "data": data }
    })



    return (
        <div>
            {data.length > 0 ? (
                <div className="mx-auto py-12 px-12 text-center">
                    <div className="flex items-center text-2xl">
                        <label>Select Invoice to Analyze: </label>
                        <select className="px-4 font-bold" onChange={handleChange}>
                            {invoicesList.map(invoice => <option key={invoice} value={invoice}>{invoice}</option>)}
                        </select>
                    </div>
                </div>
            ) : null}



            {invoice ?
                <div>

                    <div className="p-4">
                        <div name="summary">
                            <h2 className="text-2xl uppercase text-center">Billing Amount($) per Bill Rate: Invoice <span className="font-bold italic">{invoice}</span></h2>
                            <Bar
                                data={displayData}
                                options={{
                                    title: {
                                        display: true,
                                        text: "Size in GB",
                                        fontSize: 20,
                                    },
                                    legend: {
                                        display: true,
                                        position: "right",
                                    },
                                }}
                            />
                        </div>

                        <h2 className="text-2xl uppercase text-center py-10">Breakdown by Bill Rate</h2>
                        <div name="details" className="grid grid-cols-3 gap-3">

                            {
                                invoiceDataByResource.map((item, i) => {
                                    return (
                                        <div key={i} className="border">
                                            <div className="flex justify-between p-2">
                                                <p className="font-bold">Bill Rate: {numberFormat(item["Bill Rate"])}</p>
                                                <p className="font-bold">Amount: {numberFormat(item["data"].reduce((a, b) => a + Number(b["Amount"]), 0))}</p>
                                            </div>
                                            <div className="p-2 text-right">
                                                {item["data"].map((d, i) => {
                                                    return <div key={i}>{d["Resource"]} - {numberFormat(d["Amount"])}</div>
                                                })}
                                            </div>
                                        </div>)
                                })
                            }
                        </div>

                    </div> </div> : null}


        </div>
    )
}

export default DisplayData