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
    let chartDataBillRate = billRates.map(rate => {
        const data = billRateAggregated[rate]
        const totalAmount = data.reduce((a, b) => a + Number(b["Total Billable Amount"]), 0)
        return totalAmount
    })

    const displayDataBillRate = {
        labels: billRates,
        datasets: [
            {
                label: "Invoiced Amount($)",
                data: chartDataBillRate,
                backgroundColor: ["rgba(99, 99, 132, 0.8)"],
                borderColor: ["rgba(99, 99, 132, 0.8)"],
            },
        ],
    };

    let endDateAggregated = groupBy(selectedInvoiceData, "End Date")

    let endDates = Object.keys(endDateAggregated)

    let endDates1 = endDates.map(dt => new Date(dt)).sort((a, b) => a - b)

    endDates1 = endDates1.map(dt => (dt.getMonth() + 1) + "/" + (dt.getDate()) + "/" + dt.getFullYear().toString().slice(2, 4))


    let chartDataEndDate = endDates1.map(dt => {
        const data = endDateAggregated[dt];
        const totalAmount = data.reduce((a, b) => a + Number(b["Total Billable Amount"]), 0)
        return totalAmount
    })

    const displayDataEndDate = {
        labels: endDates,
        datasets: [
            {
                label: "Invoiced Amount($)",
                data: chartDataEndDate,
                backgroundColor: ["rgba(0, 99, 132, 0.8)"],
                borderColor: ["rgba(99, 0, 132, 0.8)"],
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
                        <div name="summary" className="grid grid-cols-2 gap-4">
                            <div className="border">
                                <h2 className="text-2xl uppercase text-center">Billing Amount($) per Bill Rate: Invoice <span className="font-bold italic">{invoice}</span></h2>
                                <Bar
                                    data={displayDataBillRate}
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
                            <div className="border">
                                <h2 className="text-2xl uppercase text-center">Billing Amount($) per Week: Invoice <span className="font-bold italic">{invoice}</span></h2>
                                <Bar
                                    data={displayDataEndDate}
                                    options={{
                                        title: {
                                            display: true,
                                            text: "Amount in $",
                                            fontSize: 20,
                                        },
                                        legend: {
                                            display: true,
                                            position: "right",
                                        },
                                    }}
                                />
                            </div>

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