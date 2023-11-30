import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import GradientButton from "../components/gradientButton.js";
import { OneIconTextField } from "../components/oneIconTextField.js";
import { PasswordTextField } from "../components/showPassword.js";
import { Link } from "react-router-dom";
import TextWithLink from '../components/textWithLink.js';

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [linkClicked, setLinkClicked] = useState(false);

  const { touched, errors, handleSubmit, handleChange, values } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const result = await axios.get("http://localhost:3001/customer/login", {
          params: {
            email: values.email,
            password: values.password,
          },
        });

        if (result.status === 200) {
          setLoginMessage("Success!");
          // Redirect to the main page upon successful login
          window.location.href = "/main";
        }
      } catch (err) {
        setLoginMessage(
          "Log in failed, please double check your credentials, then try again"
        );
        if (err.response) {
          console.log(err.response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (linkClicked) {
      window.location.href = "/signup";
    }
  }, [linkClicked]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        background: "#a8dadc",
        animation: "gradient 5s ease infinite",
        "@keyframes gradient": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          borderColor: "#006d77",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
          margin: "0 auto",
          padding: "2rem",
          background: "#edf6f9",
          boxShadow: "0px 0px 1px 1px #bdbdbd",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            position: "relative",
            display: "inline-block",
            fontSize: "2.25rem",
            fontWeight: "700",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            marginBlockStart: "0.67em",
            marginBlockEnd: "0.67em",
            background: "linear-gradient(300deg, #1b4965,#94d2bd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animate: "gradient 5s ease-in-out infinite",
            "@keyframes gradient": {
              "0%": {
                backgroundPosition: "0% 50%",
              },
              "50%": {
                backgroundPosition: "100% 50%",
              },
              "100%": {
                backgroundPosition: "0% 50%",
              },
            },
          }}
        >
          Sign In
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#edf6f9",
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
          }}
        >
          <OneIconTextField
            fieldColor={"#1b4965"}
            name={"email"}
            label={"Email"}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            icon={<EmailOutlined />}
          />

          <PasswordTextField
            id="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            icon={<LockOutlined />}
          />

          <div>{loginMessage}</div>
          <TextWithLink
            text="Don't have an account?"
            link={<Link to="/signup">Log in</Link>}
            onClick={() => setLinkClicked(true)}
          />
          <GradientButton
            degree="65deg"
            gradientColors={["#94d2bd", "#0a9396", "#1b4965"]}
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              lineHeight: "20px",
              padding: "12px 24px",
              ml: 2,
              mr: 2,

              mb: 2,
              mt: 2,
            }}
          >
            Log In
          </GradientButton>
        </form>
      </Container>
    </Box>
  );
};

export default LoginPage;
