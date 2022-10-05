import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IdHook from '../hook/IdHook';
import { actionUpdateData } from '../redux/action/action';

export default function NewEdit() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    
    const dispatch = useDispatch();

    const { id } = useParams();
    console.log("params", id);

    const [dataById] = IdHook(id);
    console.log("databyid", dataById);

    useEffect(() => {
        const data = () => {
            if (dataById.data) {
                setTitle(dataById.data.title)
                setDescription(dataById.data.description)
                setPrice(dataById.data.price)
            }
        };
        data();

    },[dataById.data])

    const titleHandle = (e) => {
        setTitle(e.target.value)
    }
    const descHandle = (e) => {
        setDescription(e.target.value)
    }
    const priceHandle = (e) => {
        setPrice(e.target.value)
    }

    const updateHandler = (e) => {
        e.preventDefault()
        const allData = {
            title: title,
            description: description,
            price: price
        }
        dispatch(actionUpdateData(allData, id))
        navigate('/')
    }

    return (
        <>
            <Link className='btn btn-info mx-2 my-2' to="/">back</Link>

            <h1 className='text-center mt-4'>Edit</h1>
            <div className='container mt-5 mb-5 p-4 d-flex justify-content-center ' >
                <form className='container'>
                    <div >
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput">ID</label>
                            <input type="text" disabled={true} className="form-control  w-100" id="formGroupExampleInput" placeholder="id" value={id} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput2">Title</label>
                            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Title" onChange={(e) => titleHandle(e)} value={title} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput2">Description</label>
                            <textarea type="text" className="form-control" id="formGroupExampleInput2" placeholder="description" value={description} onChange={(e) => descHandle(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput2">Price</label>
                            <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="price" onChange={(e) => priceHandle(e)} value={price} />
                        </div>

                        <button type="submit" className='btn btn-success mb-2' onClick={(e) => { updateHandler(e) }}>Edit</button>
                    </div>

                </form>
            </div>
        </>
    )
}
