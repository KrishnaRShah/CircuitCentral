import React, {useEffect, useState} from "react";
import {Button, Divider, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {EmailOutlined} from '@mui/icons-material';
import {LandingPageTitle} from "../components/landingPageTitle.js";

function ButtonWithIcon(props) {
    const {icon, text, onClick} = props;
    return (
        <Button
            variant={"contained"}
            color={"primary"}
            style={{
                marginTop: "20px",
                width: `${text.length * 10 + 40}px`,
                padding: `${text.length * 0.5 + 5}px`,
                borderRadius: "30px",
                fontSize: "1rem",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                color: "#edf6f9",
                fontWeight: "bold",
                textShadow: "1px 1px 2px #000000",
                background: "#006d77",
                animation: "gradient 10s ease-in-out infinite",
                textTransform: "none",
            }}
            onClick={onClick}
            startIcon={icon}
        >
            {text}
        </Button>
    );
}


// eslint-disable-next-line no-unused-vars
function BoxRow(props) {
    const {children} = props;
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            padding: "20px",
        }}>
            {children}
        </div>
    );
}

/**
 * This component is used to create a text with a link. The link is passed in as a prop. The text is passed in as a prop.
 * @param props - text and link
 * @returns {JSX.Element} - text with link
 * @constructor
 */
function TextWithLink(props) {
    const {text, link} = props;
    return (
        <div>
            <Typography variant="body1" style={{
                color: "#bee9e8",
                fontWeight: "lighter",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "30px",
                fontSize: "1.0rem",
                lineHeight: "1.2"
            }}>
                <span style={{color: "#457b9d", fontWeight: "bold"}}>{text}</span> {link}
            </Typography>
        </div>

    );

}

export default function LandingPage() {

    const [buttonClicked, setButtonClicked] = useState(false); // if button has been clicked go to sign up page
    const [linkClicked, setLinkClicked] = useState(false); // if user clicks on the link, go to login page

    // if button is clicked, go to sign up page
    useEffect(() => {
            if (buttonClicked) {
                window.location.href = "/signup";
            }
        }
        , [buttonClicked]);

    // if link is clicked, go to login page
    useEffect(() => {
            if (linkClicked) {
                window.location.href = "/login";
            }
        }
        , [linkClicked]);


    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                background: "#a8dadc",
                animation: "gradient 10s ease-in-out infinite",
                zIndex: "-1",
            }}>
                <div style={{
                    background: "#edf6f9",
                    borderRadius: "25px",
                    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                    maxWidth: "600px",
                    maxHeight: "700px",
                    margin: "auto",
                    marginTop: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "100%",
                        padding: "20px",
                    }}>
                        <LandingPageTitle/>
                        <ButtonWithIcon text="Sign Up With Email" icon={<EmailOutlined/>}
                                        onClick={() => setButtonClicked(true)}/>
                        <Divider style={{width: "60%", padding: "10px", marginTop: "10px", marginBottom: "10px"}}/>
                        <TextWithLink text="Already have an account?" link={<Link to="/login">Log in</Link>}
                                      onClick={() => setLinkClicked(true)}/>
                    </div>
                </div>
            </div>
        </div>
    );


}
