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
               <div className="col-6 mb-5">
                   <div className="mb-1 col-5 mx-auto text-left">
                   <i class="material-icons left">search</i>
                       <h5 cardData="form-lable h1">Search College</h5> 
                        
                       <input 
                       className="form-control" 
                       type="text" 
                       value={filter}
                       onChange={searchtext.bind(this)}/>

                   </div>

               </div>



               {dataSearch.map((item,index)=>{
                   return(
                    <div className="col-11 col-md-4 col-lg-3 mx-0 mb-4">
                    <div className="card p-0 overflow-hidden h-100 shadow">
                        <img src={item.img } className="card-img-top" alt="none"/>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.desc}</p>
                            <a  href={item.website}>
                                Schedule Meet<i class="material-icons left">send</i>
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