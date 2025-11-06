
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';



const CreateAProduct = () => {
    const { user} = useAuth()
    const axiosSecure = useAxiosSecure()
    //const axiosInstance = useAxios();

    const handleCreateProduct = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const image = e.target.image.value;
        const price_max = e.target.price_max.value;
        const price_min = e.target.price_min.value;
        console.log(title, image, price_max, price_min)

        const newProduct = { title, image, price_max, price_min ,
            email: user.email,
            seller_name : user.displayName
        }
        // axios.post('http://localhost:3000/products', newProduct)
        //     .then(data => {
        //         console.log(data.data)
        //         if (data.data.insertedId) {
        //             Swal.fire({
        //                 title: "Product Added!",
        //                 icon: "success",
        //                 draggable: true
        //             });
        //         }
        //     })
        axiosSecure.post('/products', newProduct)
        .then(data=> {
            console.log('after secure call',data.data)
        })
    }
    return (
        <div>
            <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <div className="card-body">
                    <form onSubmit={handleCreateProduct} className="fieldset">

                        <label className="label">Product Name</label>
                        <input type="text" className="input" name='title' placeholder="Product name" />
                        <label className="label">Product Image Url</label>
                        <input type="text" className="input" name='image' placeholder="Image url Price" />
                        <label className="label">Max price</label>
                        <input type="text" className="input" name='price_max' placeholder="Max Price" />
                        <label className="label">Min price</label>
                        <input type="text" className="input" name='price_min' placeholder="Min Price" />
                        <button type='submit' className="btn btn-neutral mt-4">Create Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAProduct;