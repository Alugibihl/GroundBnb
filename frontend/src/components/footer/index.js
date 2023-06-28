import "./footer.css"
// import { NavLink } from "react-router-dom";

function Footer({ isLoaded }) {
    // const sessionUser = useSelector(state => state.session.user);
    return (
        <div className='footer'>
            {isLoaded && (
                <div className="footer-row">
                    <div>
                        <a href="https://github.com/Alugibihl/GroundBnb" rel="noopener noreferrer" target="_blank"><i className="fab fa-github"></i> Github Repo</a>
                    </div>
                    <div>Created by Alexander Lugibihl @2023</div>
                    <div>
                        <a href="https://www.linkedin.com/in/alexander-lugibihl-2abb70169/" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i> Linkedin Profile</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Footer;
