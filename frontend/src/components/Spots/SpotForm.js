import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addImage, createSpot } from "../../store/spotsReducer";
import { useHistory } from 'react-router-dom'

function SpotForm({ formType }) {
    console.log('spot form running');
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState(1)
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log('description', sessionActions)
    useEffect(() => {
        const err = {}
        if (country !== 'United States' && country !== 'united states') { err.country = "We are only able to provide our services to the United States at this time" }
        if (address.length < 4) { err.address = "Please provide a valid Address." }
        if (city.length < 2) { err.city = "Please enter a valid City." }
        if (state.length < 2) { err.state = "Please Enter a valid State." }
        if (description.length < 30) { err.description = 'Please write a description atleast 30 characters long.' }
        if (price < 1 || price > 10000) { err.price = 'Price must be between $1 and $10000 nightly' }
        if (!image) { err.image = 'At least 1 image of your property is required' }
        setErrors(err)
    }, [country, address, city, state, description, name, price, image])

    const handleSubmit = async (e) => {
        console.log('handle submit running')
        e.preventDefault();
        const spotAspects = { country, address, city, state, description, name, price, lng: 1, lat: 1 }

        let createdSpot
        createdSpot = await dispatch(createSpot(spotAspects))
        const spotImages = { image, spotId: createdSpot.id }

        if (createdSpot) {
            let createdImage = await dispatch(addImage(spotImages))
            console.log('createdImage', createdImage);
            console.log('created spot', createdSpot)
            console.log('if created spot running', createdSpot)
            setErrors({})
            history.push(`/spots/${createdSpot.id}`)
        }
    }

    return (
        <div className="formatter">
            <h1>Create a new Spot</h1>
            <h2 >Where's your place located?</h2>
            <h3>Guests will only get access to your exact address once they booked a<br />
                reservation.
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
                    Mention the best features of your space, any special amentities like <br />
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
                    Catch guests' attention with a spot title that highlights what makes <br />
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
                    Competitive pricing can help your listing stand out and rank higher<br />
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
                    Submit a link to a photo to publish a spot
                    <input
                        type="url"
                        placeholder="Preview Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.image}</p>
                <button disabled={Object.values(errors).length > 0} type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;
