import {useEffect, useState} from 'react'
import axios from 'axios'

export function useAxiosGet(url){
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        error: false
    })

    useEffect(() => {
        setRequest({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url)
            .then(response => {
                setRequest({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setRequest({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url])

    return request
}

// export function useAxiosGetTrades(url){
//     const [request, setRequest] = useState({
//         loading: false,
//         data: null,
//         error: false,
//         roster1: null,
//         roster2: null,
//         roster1adds: null,
//         roster2adds: null,
//     })

//     useEffect(() => {
//         setRequest({
//             loading: false,
//             data: null,
//             error: false,
//             roster1: null,
//             roster2: null,
//             roster1adds: null,
//             roster2adds: null,
//         })
//         axios.get(url)
//             .then(response => {
//                 let r1 = response.data.filter((row) => row.roster_ids === row.roster_ids[0])
//                 // let r1 = response.data.row.roster_ids[0]
//                 // let r2 = response.data.row.roster_ids[1]

//                 setRequest({
//                     loading: false,
//                     data: response.data,
//                     roster1: r1,
//                     roster2: null,
//                     roster1adds: null,
//                     roster2adds: null,
//                     error: false
//                 })
//             })
//             .catch(() => {
//                 setRequest({
//                     loading: false,
//                     data: null,
//                     error: false,
//                     roster1: null,
//                     roster2: null,
//                     roster1adds: null,
//                     roster2adds: null,
//                 })
//             })
//     }, [url])

//     return request
// }

export function useAxiosGetTree(url){
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        qbs: null,
        rbs: null,
        wrs: null,
        tes: null,
        error: false
    })

    useEffect(() => {
        setRequest({
            loading: true,
            data: null,
            qbs: null,
            rbs: null,
            wrs: null,
            tes: null,
            error: false
        })
        axios.get(url)
            .then(response => {
                let start_points = response.data.filter((row) => row.start_points > 0)
                let qb_data = start_points.filter( (row) => row.position.includes("QB"))
                let qb = []
                for (let i = 0; i < qb_data.length; i++) {
                        let p_data = {
                            x: qb_data[i].full_name,
                            y: qb_data[i].start_points
                        }
                        qb.push(p_data)
                }
                let rb_data = start_points.filter( (row) => row.position.includes("RB"))
                let rb = []
                for (let i = 0; i < rb_data.length; i++) {
                        let p_data = {
                            x: rb_data[i].full_name,
                            y: rb_data[i].start_points
                        }
                        rb.push(p_data)
                }
                let wr_data = start_points.filter( (row) => row.position.includes("WR"))
                let wr = []
                for (let i = 0; i < wr_data.length; i++) {
                        let p_data = {
                            x: wr_data[i].full_name,
                            y: wr_data[i].start_points
                        }
                        wr.push(p_data)
                }
                let te_data = start_points.filter( (row) => row.position.includes("TE"))
                let te = []
                for (let i = 0; i < te_data.length; i++) {
                        let p_data = {
                            x: te_data[i].full_name,
                            y: te_data[i].start_points
                        }
                        te.push(p_data)
                }
                setRequest({
                    loading: false,
                    data: response.data,
                    qbs: qb,
                    rbs: rb,
                    wrs: wr,
                    tes: te,
                    error: false
                })
            })
            .catch(() => {
                setRequest({
                    loading: false,
                    data: null,
                    qbs: null,
                    rbs: null,
                    wrs: null,
                    tes: null,
                    error: true
                })
            })
    }, [url])

    return request
}

export function useAxiosGetTotals(url){
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        labels: null,
        error: false
    })

    useEffect(() => {
        setRequest({
            loading: true,
            data: null,
            labels: null,
            error: false
        })
        axios.get(url)
            .then(response => {
                let start_points = response.data.filter((row) => row.start_points > 0)
                let qb_data = start_points.filter( (row) => row.position.includes("QB"))
                console.log(qb_data)
                let rb_data = start_points.filter( (row) => row.position.includes("RB"))
                let wr_data = start_points.filter( (row) => row.position.includes("WR"))
                let te_data = start_points.filter( (row) => row.position.includes("TE"))
                let totals = []
                let labels = ["QB", "RB", "WR", "TE"]

                let qb = 0
                for (let i = 0; i < qb_data.length; i++) {
                    qb = qb + qb_data[i].start_points
                }
                totals.push(qb)

                let rb = 0
                for (let i = 0; i < rb_data.length; i++) {
                    rb = rb + rb_data[i].start_points
                }
                totals.push(rb)

                let wr = 0
                for (let i = 0; i < wr_data.length; i++) {
                    wr = wr + wr_data[i].start_points
                }
                totals.push(wr)

                let te = 0
                for (let i = 0; i < te_data.length; i++) {
                    te = te + te_data[i].start_points
                }
                totals.push(te)
                // console.log(qb, totals)

                setRequest({
                    loading: false,
                    data: totals,
                    labels: labels,
                    error: false
                })
            })
            .catch(() => {
                setRequest({
                    loading: false,
                    data: null,
                    labels: null,
                    error: true
                })
            })
    }, [url])

    return request
}
