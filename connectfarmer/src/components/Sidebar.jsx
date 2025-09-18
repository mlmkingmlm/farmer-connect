import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
    const userId = localStorage.getItem("userId");
    return (
        <>
            <div className="col-md-3 mb-2">
                <div className="list-group bg-dark">
                    <Link to={`/user/dashboard/${userId}`} className=" bg-dark list-group-item list-group-item-action active" aria-current="true">
                        <i className='bi-house'></i> Dashboard
                    </Link>
                    <Link to="/user/maincategory" className="bg-dark text-light list-group-item list-group-item-action">
                        🌾 Farming Category
                    </Link>
                    <Link to="/user/subcategory" className="bg-dark text-light list-group-item list-group-item-action">


                        🌱 Sub Farming Type

                    </Link>
                    <Link to="/user/cost" className="bg-dark text-light list-group-item list-group-item-action">
                        💰 Cost Calculator
                    </Link>
                    <Link to="/user/profitloss" className="bg-dark text-light list-group-item list-group-item-action">
                        📊 Profit & Loss
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Sidebar
