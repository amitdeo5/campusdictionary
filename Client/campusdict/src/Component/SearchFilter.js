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
               <div className="col-10 mb-15">
                   <div className="mb-10 col-15 mx-auto text-left">
                   <i class="material-icons left">search</i>
                       <h5 cardData="form-lable h1">Search</h5> 

                                           

                       <input 
                       className="form-control mr-sm-2" 
                       type="text" 
                       placeholder="Type College Name Here"
                       aria-label="Search"
                       value={filter}
                       onChange={searchtext.bind(this)}/>
                  
                   </div>
                   

               </div>
               {/* <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" /> */}


               {dataSearch.map((item,index)=>{
                   return(
                    <div className="col-11 col-md-4 col-lg-3 mx-0 mb-4">
                    <div className="card p-0 overflow-hidden h-100 shadow">
                        <img src={item.img } className="card-img-top" alt="none"/>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p style = {{color : "red"}} className="card-text">{item.desc}</p>
                            
                            <a style = {{position:"absolute; bottom:0"}} href={item.website}>
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