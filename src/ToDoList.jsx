import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'

const ToDoList = () => {

    const [result, setResult] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [view, setView] = useState(0)
    const [int, setInt] = useState({})


    useEffect(()=>{
        axios.get(`https://dummyjson.com/products`).then((res) => {
            setResult(res.data.products)
        }).catch((err) => {
            console.log(err);
        })

    },[])

    const openModal = (ind, val) => {
        setIsModalOpen(true);
        setInt(val);
        setView(ind);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleClickOutside = (event) => {
        if (event.target.id === 'myModal') {
            setIsModalOpen(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInt({...int, [name]: value});
    };


    const updateData = () => {
        const updatedResult = result.map((item) =>
            item.id === int.id ? { ...int } : item
        );
        setResult(updatedResult);
        closeModal();
    };

    const deleteData = (id) => {
        const updatedResult = result.filter((item) => item.id !== id);
        setResult(updatedResult);
    };

    return (
        <>

            <section className='container pt-4 '>
                <div className='row'>
                    {
                        result?.map((value, index) => {
                            return (<div className='col-4 my-3' key={index}>
                                <div className='card top'>
                                    <div className='card-body px-5 py-3'>
                                        <p className='card-subtitle'>Id: {value.id}</p>
                                        <h5 className='card-title'>Title: {value.title}</h5>
                                        <p className='card-text mt-1'>Price: {value.price}</p>
                                        <p className='card-text mt-1'>Desc: {value.description}</p>
                                        <div className='d-flex mt-1 justify-content-around'>
                                            <button type='button' className='btn border border-1' onClick={() => openModal(index, value)}>View</button>
                                            <button type='button' className='btn border border-1' onClick={() => deleteData(value.id)}>Delete</button>
                                            {isModalOpen && view === index && (
                                                <div id="myModal" className="modal" onClick={handleClickOutside}>
                                                    <div className="modal-content">
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='float-start mt-2'>View the data of To..</p>
                                                            <span className="close float-end" onClick={closeModal}>&times;</span>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <p className='card-subtitle'>Id: {int.id}</p>
                                                            <p className='card-title'>Title: {int.title}</p>
                                                            <p className='card-text mt-1'>Price: {int.price}</p>
                                                            <p className='card-text'>Desc: {int.description}</p>
                                                        </div>
                                                        <div className='mt-3 d-flex'>
                                                            <input type='text' className='form-control' name='title' placeholder='Enter Title' onChange={handleInputChange} value={int.title}></input>
                                                            <input type='text' className='form-control' name='description' placeholder='Enter Dec' onChange={handleInputChange} value={int.description}></input>
                                                            <button type='button' className='btn border border-1' onClick={updateData}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div >
            </section >
        </>
    )
}

export default ToDoList