import React from 'react'
import { Link } from 'react-router-dom'
function AdminSidebar() {
    return (
        <>
            <div className="col-md-3 mb-2">
                <div className="list-group bg-dark">
                    <Link to={`/admin/dashboard`} className=" bg-dark list-group-item list-group-item-action active" aria-current="true">
                        <i className='bi-person'></i> Total Farmers
                    </Link>
                    <Link to="/admin/farmers/location" className="bg-dark text-light list-group-item list-group-item-action">
                        🌾 Farmers By Location
                    </Link>
                </div>

            </div>
        </>
    )
}

export default AdminSidebar
