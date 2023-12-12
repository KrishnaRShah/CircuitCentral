import { useState } from "react";
import { useFormik } from "formik";
import { Container, Typography } from "@mui/material";
import { OneIconTextField } from "../oneIconTextField.js";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import GradientButton from "../gradientButton.js";
import axios from "axios";
import * as Yup from "yup";

const initialValues = {
  street: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
};

const validationSchema = Yup.object({
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),
});

const AddressInput = () => {
  const [submitMessage, setSubmitMessage] = useState("");
  const customer = JSON.parse(localStorage.getItem("customer"));

  const { touched, errors, handleSubmit, handleChange, values } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const address = `${values.street}, ${values.city}, ${values.province} ${values.postalCode}, ${values.country}`;
      const data = {
        name: customer.name,
        email: customer.email,
        shipping_address: address,
        password: customer.password,
      };

      axios.put(`http://localhost:3001/customer/${customer._id}`, data);
      const newCustomer = {
        _id: customer._id,
        unique_id: customer.unique_id,
        name: customer.name,
        email: customer.email,
        shipping_address: address,
        password: customer.password,
      };
      localStorage.setItem("customer", JSON.stringify(newCustomer));
      setSubmitMessage("Address saved successfully!");
    },
  });

  return (

      <Container maxWidth="sm" style={{padding: "10px"}}>
        <Typography style={{ color: "#006d77", fontWeight: "bold" }}>
          Enter Your Address
        </Typography>

        <form onSubmit={handleSubmit}>
          <OneIconTextField
            fieldColor="#1b4965"
            name="street"
            label="Street"
            value={values.street}
            onChange={handleChange}
            error={touched.street && Boolean(errors.street)}
            helperText={touched.street && errors.street}
            icon={<LocationOnOutlined />}
          />
          <OneIconTextField
            fieldColor="#1b4965"
            name="city"
            label="City"
            value={values.city}
            onChange={handleChange}
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city && errors.city}
            icon={<LocationOnOutlined />}
          />
          <OneIconTextField
            fieldColor="#1b4965"
            name="province"
            label="Province"
            value={values.province}
            onChange={handleChange}
            error={touched.province && Boolean(errors.province)}
            helperText={touched.province && errors.province}
            icon={<LocationOnOutlined />}
          />
          <OneIconTextField
            fieldColor="#1b4965"
            name="postalCode"
            label="Postal Code"
            value={values.postalCode}
            onChange={handleChange}
            error={touched.postalCode && Boolean(errors.postalCode)}
            helperText={touched.postalCode && errors.postalCode}
            icon={<LocationOnOutlined />}
          />
          <OneIconTextField
            fieldColor="#1b4965"
            name="country"
            label="Country"
            value={values.country}
            onChange={handleChange}
            error={touched.country && Boolean(errors.country)}
            helperText={touched.country && errors.country}
            icon={<LocationOnOutlined />}
          />
          <div>{submitMessage}</div>

          <GradientButton
            degree="65deg"
            gradientColors={["#94d2bd", "#0a9396", "#1b4965"]}
            type="submit"
            variant="contained"
            fullWidth
          >
            Save Address
          </GradientButton>
        </form>
      </Container>

  );
};

export default AddressInput;
