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
    const [image, setImage] = useState(initialValues?.image !== null ? initialValues?.image : "");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const images = useSelector((state) => state.spots[spotsId]?.SpotImages)

    useEffect(() => {
        setCountry(initialValues?.country ? initialValues?.country : "");
        setAddress(initialValues?.address ? initialValues?.address : "");
        setCity(initialValues?.city ? initialValues?.city : "");
        setState(initialValues?.state ? initialValues?.state : "");
        setDescription(initialValues?.description ? initialValues?.description : "");
        setName(initialValues?.name ? initialValues?.name : "");
        setPrice(initialValues?.price ? initialValues?.price : "");
        setImage(initialValues?.image ? initialValues?.image : "");
    }, [initialValues]);

    console.log('incoming values', initialValues);
    useEffect(() => {
        setCountry(country)
        setAddress(address)
        setCity(city)
        setState(state)
        setDescription(description)
        setName(name)
        setPrice(price)
        setImage(image)
    }, [country, address, city, state, description, name, price, image])

    const handleSubmit = async (e) => {
        console.log('handle submit running')
        e.preventDefault();
        setErrors({})
        const spotAspects = { country, address, city, state, description, name, price, lng: 1, lat: 1 }
        let createdSpot;
        let updatedSpot;
        if (formType === "Edit Spot") {
            updatedSpot = await dispatch(editSpot({ spotAspects, spotsId }))
            const spotImages = { image, spotsId }
            if (updatedSpot) {
                console.log('we are in edit spot', spotImages)
                return dispatch(addImage(spotImages))
                    .then(history.push(`/spots/${spotsId}`))
                    .catch(async (res) => {
                        const data = await res.json();
                        console.log('this is data', data)
                        if (data && data.errors) {
                            setErrors(data.errors);
                            history.push(`/spots/${spotsId}`)
                        }
                    });

            }
        } else {
            console.log('we are in create spot', spotAspects)
            createdSpot = await dispatch(createSpot(spotAspects))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log('this is data', data)
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                })
            const spotImages = { image, spotId: createdSpot.id }
            console.log('spot images', spotImages);
            if (createdSpot) {
                return dispatch(addImage(spotImages), history.push(`/spots/${createdSpot.id}`))
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
                        />
                    </label></div>
                {errors.city && <p className="errors">{errors.city}</p>}
                {errors.state && <p className="errors">{errors.state}</p>}
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
                    />
                </label>
                {errors.description && <p className="errors">{errors.description}</p>}
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
                    />
                </label>
                {errors.name && <p className="errors">{errors.name}</p>}
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
                        /></div>
                </label>
                {errors.price && <p className="errors">{errors.price}</p>}
                <h2>Liven up your spot with photos</h2>
                <label className="longer-description">
                    Submit a link to a photo to publish a spot
                    {formType === "Edit Spot" ?
                        images?.map((pic) => {
                            return <div key={pic.id} className="edit-images" ><img src={pic.url} alt='unavailable' />
                                <input
                                    type="url"
                                    placeholder="Preview Image URL"
                                    value={pic.url}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                        }) :
                        <input
                            type="url"
                            placeholder="Preview Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    }
                    {<input className={formType !== "Edit Spot" ? 'hidden' : ''}
                        type="url"
                        placeholder="Preview Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)} />}
                </label>
                {errors.image && <p className="errors">{errors.image}</p>}
                <button className={formType === "Edit Spot" ? 'hidden' : null} disabled={Object.values(errors).length > 0} type="submit">Create Spot</button>
                <button className={formType !== "Edit Spot" ? 'hidden' : null} disabled={Object.values(errors).length > 0} type="submit">Update Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;
