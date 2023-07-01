import React from "react";
import Signin from "../Signin";
import { MeetForm } from "../MeetForm";
import {useLocation} from 'react-router-dom'
export const ScheduleMeet = () => {
    const search = useLocation().search;
    const description =(new  URLSearchParams(search).get('description'));
    const name =(new  URLSearchParams(search).get('name'));
    const email =(new  URLSearchParams(search).get('email'));
    const id =(new URLSearchParams(search).get('_id'));

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="bg-white mt-4" style={{
                display: 'flex', width: '75%',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }}>
                <div className="p-4" style={{ width: '50%' }}>
                    <p style={{ color: 'grey' }}>Campus Dictionary</p>
                    <h1 style={{
                        fontFamily: 'monospace',
                        fontWeight: 'bold', fontSize: 25, marginBottom: 8,
                    }}>Meeting with {name}</h1>
                    <h3 style={{
                        fontFamily: 'bold', fontFamily: 'monospace',
                        marginBottom: 8, marginTop: 8,
                    }}>Time : 15min </h3>
                    <h3 style={{
                        fontFamily: 'bold', fontFamily: 'monospace',
                        marginBottom: 8, marginTop: 8,
                    }}>Position  - </h3>
                    <h4 style={{ color: 'grey', marginBottom: 16 }}>TPC coordinator</h4>
                    <p style={{ fontFamily: 'monospace' }}>About institution :</p>
                    <p style={{ fontFamily: 'monospace' }}>
                        {description}
                    </p>
                </div>
                <div style={{ width: '50%' }}>
                    <MeetForm email={email} clgName={name} />
                </div>
            </div>
        </div>
    )
}