import { useState, useEffect } from "react";


function CreateSpotForm() {
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(1)
    const [image, setImage] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <h1>Create a new Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get access to your exact address once they booked a<br />
                reservation.
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Describe your place to guests
                    <input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Create a title for your spot
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Set a base price for your spot
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Create a title for your spot
                    <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default CreateSpotForm;
