import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, createSpot, editSpot } from "../../store/spotsReducer";
import { useHistory } from 'react-router-dom'

function SpotForm({ formType, spotsId, initialValues }) {
    const [country, setCountry] = useState(initialValues?.country !== null ? initialValues?.country : "");
    const [address, setAddress] = useState(initialValues?.address !== null ? initialValues?.address : "");
    const [city, setCity] = useState(initialValues?.city !== null ? initialValues?.city : "");
    const [state, setState] = useState(initialValues?.state !== null ? initialValues?.state : "");
    const [description, setDescription] = useState(initialValues?.description !== null ? initialValues?.description : "");
    const [name, setName] = useState(initialValues?.name !== null ? initialValues?.name : "");
    const [price, setPrice] = useState(initialValues?.price !== null ? initialValues?.price : "");
    // const [image, setImage] = useState(initialValues?.image !== null ? initialValues?.image : "");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [imagehold] = useState([]);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session)


    useEffect(() => {
        setCountry(initialValues?.country ? initialValues?.country : "");
        setAddress(initialValues?.address ? initialValues?.address : "");
        setCity(initialValues?.city ? initialValues?.city : "");
        setState(initialValues?.state ? initialValues?.state : "");
        setDescription(initialValues?.description ? initialValues?.description : "");
        setName(initialValues?.name ? initialValues?.name : "");
        setPrice(initialValues?.price ? initialValues?.price : "");

    }, [initialValues]);

    useEffect(() => {
        setCountry(country)
        setAddress(address)
        setCity(city)
        setState(state)
        setDescription(description)
        setName(name)
        setPrice(price)
    }, [country, address, city, state, description, name, price])

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({})
        if (image1 !== "") imagehold.push({ url: image1, preview: true })
        if (image2 !== "") imagehold.push({ url: image2, preview: false })
        if (image3 !== "") imagehold.push({ url: image3, preview: false })
        if (image4 !== "") imagehold.push({ url: image4, preview: false })
        if (image5 !== "") imagehold.push({ url: image5, preview: false })
        const spotAspects = { country, address, city, state, description, name, price, lng: 1, lat: 1 }
        let createdSpot;
        let updatedSpot;
        if (formType === "Edit Spot") {
            updatedSpot = await dispatch(editSpot({ spotAspects, spotsId }))
            const spotImages = { imagehold, spotsId }
            if (updatedSpot) {
                return dispatch(addImage(spotImages))
                    .then(history.push(`/spots/${spotsId}`))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) {
                            setErrors(data.errors);
                            history.push(`/spots/${spotsId}`)
                        }
                    });
            }
        } else {
            createdSpot = await dispatch(createSpot(spotAspects))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                })
            const spotImages = { imagehold, spotId: createdSpot.id }
            if (createdSpot) {
                const newImg = await dispatch(addImage(spotImages))
                if (newImg) history.push(`/spots/${createdSpot.id}`)
            }
        }
    }

    return (
        <div className="formatter">
            <h2 className={formType === "Edit Spot" ? 'hidden' : 'formTitle'}>Create a new Spot</h2>
            <h2 className={formType !== "Edit Spot" ? 'hidden' : 'formTitle'}>Update your Spot</h2>
            <h2>Where's your place located?</h2>
            <h4 className="longer-description">Guests will only get access to your exact address once they booked a reservation.
            </h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Country
                    <input
                        type="text"
                        placeholder="United States"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        minLength={2}
                        maxLength={14}
                    />
                </label>
                {errors.country && <p className="errors">{errors.country}</p>}
                <label>
                    Street Address
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        minLength={1}
                    />
                </label>
                {errors.address && <p className="errors">{errors.address}</p>}
                <div className="form-change">
                    <label className="city">
                        City
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            minLength={2}
                            maxLength={20}
                        />
                    </label>
                    <label className="comma">
                        ,
                    </label>
                    <label className="state">
                        State
                        <input
                            type="text"
                            placeholder="STATE"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            minLength={2}
                            maxLength={15}
                        />
                    </label></div>
                {errors.city && <p className="errors">{errors.city}</p>}
                {errors.state && <p className="errors">{errors.state}</p>}
                <p className="line"></p>
                <h2>Describe your place to guests</h2>
                <label className="longer-description">
                    Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                    <input
                        type="textarea"
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        minLength={30}
                    />
                </label>
                {errors.description && <p className="errors">{errors.description}</p>}
                <p className="line"></p>
                <h2>Create a title for your spot</h2>
                <label className="longer-description">
                    Catch guests' attention with a spot title that highlights what makes
                    your place special.
                    <input
                        type="text"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        maxLength={49}
                        minLength={3}
                    />
                </label>
                {errors.name && <p className="errors">{errors.name}</p>}
                <p className="line"></p>
                <h2>Set a base price for your spot</h2>
                <label className="longer-description">
                    Competitive pricing can help your listing stand out and rank higher
                    in search results.
                    <div className="price-align">$
                        <input
                            placeholder="Price per night (USD)"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min={1}
                            step={1}



                        /></div>
                </label>
                {errors.price && <p className="errors">{errors.price}</p>}
                <p className="line"></p>
                <h2>Liven up your spot with photos</h2>
                <label className="longer-description">
                    Submit a link to a photo to publish a spot
                    {formType === "Edit Spot" ? <div>Feature coming soon!!</div>
                        // images?.map((pic) => {
                        //     return <div key={pic.id} className="edit-images" ><img src={pic.url} alt='unavailable' />
                        //         <input
                        //             type="url"
                        //             placeholder="Preview Image URL"
                        //             value={pic.url}
                        //             onChange={(e) => setImage1(e.target.value)}
                        //         />
                        //     </div>
                        // })
                        :
                        <>
                            <label>
                                <input
                                    type="url"
                                    placeholder="Preview Image URL"
                                    value={image1}
                                    onChange={(e) => setImage1(e.target.value)}
                                    required
                                /></label>

                            <label>
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    value={image2}
                                    onChange={(e) => setImage2(e.target.value)}
                                /></label>
                            <label>
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    value={image3}
                                    onChange={(e) => setImage3(e.target.value)}
                                /></label>
                            <label>
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    value={image4}
                                    onChange={(e) => setImage4(e.target.value)}
                                /></label>
                            <label>
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    value={image5}
                                    onChange={(e) => setImage5(e.target.value)}
                                /></label>
                        </>
                    }
                    {/* {<input className={formType !== "Edit Spot" ? 'hidden' : ''}
                        type="url"
                        placeholder="Feature coming soon!!"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)} />} */}
                </label>
                <p className="line"></p>
                {errors.image && <p className="errors">{errors.image}</p>}
                <button className={formType === "Edit Spot" ? 'hidden' : null} disabled={Object.values(errors).length > 0 || user.user === null} type="submit">Create Spot</button>
                <button className={formType !== "Edit Spot" ? 'hidden' : null} disabled={Object.values(errors).length > 0 || user.user === null || description?.length < 30} type="submit">Update Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;
