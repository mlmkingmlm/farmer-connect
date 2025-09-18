import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useParams } from 'react-router-dom'

function Dashboard() {
    const [user, setUser] = useState({})
    const {id} = useParams()
    useEffect(() => {
    fetch(`http://localhost:5000/registration/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

    return (
        <>
            <div className='container-fluid mt-5'>
                <div className="row">
                    <Sidebar />
                    <div className="col-md-9">
                        <h5 className='text-center text-light bg-dark p-2 fw-bold'>User Dashboard</h5>
                        <div className='border p-3 border-black'>
                            <h5>Hello, {user.name}</h5>
                            <p>Welcome to your farmer dashboard! Here you can view your recent orders, manage addresses, update account details, and track your farming activities—all in one place.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
