import React, { useState } from "react";
import data from "./data";
import {useHistory} from "react-router-dom";
function SearchFilter(){
    let history=useHistory();
    const [filter,setFilter]=useState('');
    const searchtext=(event)=>{
        setFilter(event.target.value);
    }
    let dataSearch=data.cardData.filter( item =>{
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    });
    
    
    return(
       <section className="py-4 container">
           <div className="row justify-center">
               <div className="col-12 mb-5">
                   <div className="mb-3 col-4 mx-auto text-center">
                       <h1 cardData="form-lable h4">Search</h1>
                       <input 
                       className="form-control" 
                       type="text" 
                       value={filter}
                       onChange={searchtext.bind(this)}/>

                   </div>

               </div>



               {dataSearch.map((item,index)=>{
                   return(
                    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                    <div className="card p-0 overflow-hidden h-100 shadow">
                        <img src={item.img } className="card-img-top" alt="none"/>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.desc}</p>
                            <a  href="https://calendly.com/campusdictionary/uietchd/2022-03-23T09:00:00+05:30?month=2022-03&date=2022-03-23" class="waves-effect waves-light btn">
                                Schedule Meet<i class="material-icons right">send</i>
                            </a>
                        </div>
                    </div>
                 </div> 
                   )
               })}



               
           </div>
       </section>
    )
}
export default SearchFilter;