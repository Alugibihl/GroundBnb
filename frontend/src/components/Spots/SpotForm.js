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
    const Images = useSelector((state) => state.spots[spotsId]?.SpotImages)

    useEffect(() => {
        setCountry(initialValues?.country !== null ? initialValues?.country : "");
        setAddress(initialValues?.address !== null ? initialValues?.address : "");
        setCity(initialValues?.city !== null ? initialValues?.city : "");
        setState(initialValues?.state !== null ? initialValues?.state : "");
        setDescription(initialValues?.description !== null ? initialValues?.description : "");
        setName(initialValues?.name !== null ? initialValues?.name : "");
        setPrice(initialValues?.price !== null ? initialValues?.price : "");
        setImage(initialValues?.image !== null ? initialValues?.image : "");
    }, [initialValues]);

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
        let err = {}
        if (country !== 'United States' && country !== 'united states') { err.country = "We are only able to provide our services to the United States at this time" }
        if (address.length < 4) { err.address = "Please provide a valid Address." }
        if (city.length < 2) { err.city = "Please enter a valid City." }
        if (state.length < 2) { err.state = "Please Enter a valid State." }
        if (description.length < 30) { err.description = 'Please write a description atleast 30 characters long.' }
        if (!name.length) { err.name = 'Title is Required' }
        if (price < 1 || price > 10000) { err.price = 'Price must be between $1 and $10000 nightly' }
        if (!image) { err.image = 'At least 1 image of your property is required' }
        setErrors(err)
        if (Object.keys(err).length === 0) { // check if there are any errors
            const spotAspects = { country, address, city, state, description, name, price, lng: 1, lat: 1 }
            let createdSpot;
            let updatedSpot;
            if (formType === "Edit Spot") {
                console.log('WE MADE IT!@@@!!!!!!!!!!!!!!!!!!!!!!');
                updatedSpot = await dispatch(editSpot({ spotAspects, spotsId }))
                let spotId = spotsId
                const spotImages = { image, spotId }
                if (updatedSpot) {
                    let createdImage = await dispatch(addImage(spotImages))
                    console.log('createdImage', createdImage);
                    console.log('if created spot running', updatedSpot)
                    setErrors({})
                    history.push(`/spots/${spotsId}`)
                }
            } else {
                createdSpot = await dispatch(createSpot(spotAspects))
                const spotImages = { image, spotId: createdSpot.id }
                if (createdSpot) {
                    let createdImage = await dispatch(addImage(spotImages))
                    console.log('createdImage', createdImage);
                    console.log('created spot', createdSpot)
                    setErrors({})
                    history.push(`/spots/${createdSpot.id}`)
                }
            }
        } else {
            setErrors({})
        }
    }

    return (
        <div className="formatter">
            {console.log('here is that slice of state yall wanted', Images)}
            <h2 className={formType === "Edit Spot" ? 'hidden' : 'formTitle'}>Create a new Spot</h2>
            <h2 className={formType !== "Edit Spot" ? 'hidden' : 'formTitle'}>Update your Spot</h2>
            <h2 >Where's your place located?</h2>
            <h3>Guests will only get access to your exact address once they booked a reservation.
            </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Country
                    <input
                        type="text"
                        placeholder="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.country}</p>
                <label>
                    Street Address
                    <input
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.address}</p>
                <label>
                    City
                    <input
                        type="text"
                        placeholder="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.city}</p>
                <label>
                    State
                    <input
                        type="text"
                        placeholder="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.state}</p>
                <label>
                    <h2>Describe your place to guests</h2>
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
                <p className="errors">{errors.description}</p>
                <label>
                    <h2>Create a title for your spot</h2>
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
                <p className="errors">{errors.name}</p>
                <label>
                    <h2>Set a base price for your spot</h2>
                    Competitive pricing can help your listing stand out and rank higher
                    in search results.
                    <div>$
                        <input
                            placeholder="Price per night (USD)"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        /></div>
                </label>
                <p className="errors">{errors.price}</p>
                <label>
                    <h2>Liven up your spot with photos</h2>
                    Submit a link to a photo to publish a spot {
                        Images?.map((image) => {
                            return <div className="edit-images" key={image.id}><img src={image.url} alt='unavailable' />
                                <input
                                    type="url"
                                    placeholder="Preview Image URL"
                                    value={image.url}
                                    onChange={(e) => setImage(e.target.value)}
                                    required={formType !== "Edit Spot"}
                                />
                            </div>
                        })
                    }
                    {/* <input
                        type="url"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    /> */}
                </label>
                <p className="errors">{errors.image}</p>
                <button disabled={Object.values(errors).length > 0} type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;
