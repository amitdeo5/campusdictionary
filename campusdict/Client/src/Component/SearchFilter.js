import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import FullCard from "./FullCard";

function SearchFilter({ isLogin }) {
    const history = useHistory();
    const handleRoute = (item) => {
        if (isLogin) {
            const obj = {
                ...item,
                email: item.addedBy.email,
            }
            const params = new URLSearchParams(obj).toString();
            history.push('/schedulemeet');
            history.replace({
                pathName: '/schedulemeet',
                state: item,
                search: `/item=${params}`
            })
        }
        else {
            history.push('/user/register')
        }
    }
    const [APIdata, setdata] = useState([]);
    useEffect(() => {
        axios.get("/api/v1/college/all").then(response => {
            setdata(response.data);
        })
    }, [])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showCard, setShowCard] = useState(false);
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = (APIdata.length != 0) ? (APIdata.colleges.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })) : 0
            setFilteredResults(filteredData)
        }
        else { setFilteredResults(APIdata); }
    }

    const truncate = (textSize) => {
        if (textSize.length >= 125) {
            return textSize.substring(0, 125) + '...';
        }
        return textSize;
    }

    return (
        <section className="py-4 container">
            <div className="row justify-center">
                <div className="col-10 mb-15">
                    <div className="mb-10 col-15 mx-auto text-left">
                        <i class="material-icons left">search</i>
                        <h5 cardData="form-lable h1">Search</h5>
                        <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Type College Name Here"
                            aria-label="Search"
                            onChange={(e) => searchItems(e.target.value)} />
                    </div>


                </div>

                {searchInput.length > 1 ? (
                    filteredResults.map((item, index) => {
                        return (
                            <div className="col-11 col-md-4 col-lg-3 mx-0 mb-4">
                                <div className="card p-0 overflow-hidden h-100 shadow">
                                    <img src={item.pic} className="card-img-top" alt="none" />
                                    <div className="p-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 style={{
                                            'fontSize': '1.4rem',
                                            'fontFamily': 'sans-serif',
                                            'color': '#34b4eb'
                                        }}>{item.name}</h5>
                                        <div className="h-32 w-14 overflow-hidden text-ellipsis whitespace-normal"><p style={{ color: "#8c378b", fontFamily: 'monospace' }} className="">{truncate(item.description)}
                                            <div style={{ display: 'inline-block' }}><FullCard item={item} handleRoute={handleRoute} /></div></p></div>
                                        <div><p style={{ color: "#e6b935", fontWeight: "700" }} className="mt-1">Placements stats :{item.placements}</p></div>
                                        <div className="mt-1"><a style={{ color: "#e85a72" }} onClick={() => { handleRoute(item) }}>
                                            Schedule Meet<i class="material-icons left">send</i>
                                        </a> </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )) : (APIdata.length != 0) ? APIdata.colleges.map((item, index) => {
                        return (
                            <div className="col-11 col-md-4 col-lg-3 mx-0 mb-4">
                                <div className="card p-0 overflow-hidden h-100 shadow">
                                    <img src={item.pic} className="card-img-top" alt="none" />
                                    <div className="p-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 style={{
                                            'fontSize': '1.4rem',
                                            'fontFamily': 'sans-serif',
                                            'color': '#34b4eb'
                                        }}>{item.name}</h5>
                                        <div className="h-32 w-14 overflow-hidden text-ellipsis whitespace-normal"><p style={{ color: "#8c378b", fontFamily: 'monospace' }} className="">{truncate(item.description)}
                                            <div style={{ display: 'inline-block' }}><FullCard item={item} handleRoute={handleRoute} /></div>
                                        </p></div>
                                        <div><p style={{ color: "#e6b935", fontWeight: "700" }} className="mt-1">Placements stats :{item.placements}</p></div>
                                        <div className="mt-1"><a style={{ color: "#e85a72", cursor: 'pointer' }} onClick={() => { handleRoute(item) }}>
                                            Schedule Meet<i class="material-icons left">send</i>
                                        </a> </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <></>
                }




            </div>
        </section>
    )
}
export default SearchFilter;