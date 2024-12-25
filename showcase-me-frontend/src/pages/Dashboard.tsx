    import React, { useState, useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { RootState } from "../store";
    import { savePortfolio } from "../services/portfolioService";
    import { setPortfolio } from "../features/portfolioSlice";
    import { Button, TextField, Box, Typography } from "@mui/material";

    const Dashboard: React.FC = () => {
        const dispatch = useDispatch();
        const portfolio = useSelector((state: RootState) => state.portfolio.portfolio);
        const [form, setForm] = useState({
            personalDetails: {
                name: "",
                email: "",
                phone: ""
            },
            skills: [],
            experience: [],
            projects: [],
            education: [],
            certifications: [],
            description: ""
        });
        const [loading, setLoading] = useState(false);
        const [emailError, setEmailError] = useState<string | null>(null);
        const [phoneError , setPhoneError] = useState<string | null>(null);

        useEffect(() => {
            if (portfolio) {
                setForm(portfolio);
            }
        }, [portfolio]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm((prevForm) => ({
                ...prevForm,
                personalDetails: {
                    ...prevForm.personalDetails,
                    [name]: value
                }
            }));

            if (name === "email") {
                validateEmail(value);
            }
            if (name === "phone") {
                validatePhone(value);
            }
        };

        const validatePhone = (phone: string) => {
            const PhoneRegex = /^[6-9]\d{9}$/;
            if (!PhoneRegex.test(phone)){
                setPhoneError("Invalid phone number");
            }
            else{
                setPhoneError(null);
            }
        }

        const validateEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError("Invalid email address");
            } else {
                setEmailError(null);
            }
        };

        const handleSave = async () => {
            if (emailError) {
                alert("Please fix the errors before saving.");
                return;
            }

            setLoading(true);
            try {
                const savedPortfolio = await savePortfolio(form);
                dispatch(setPortfolio(savedPortfolio));
                alert("Portfolio saved!");
            } catch (error) {
                console.error("Error saving portfolio:", error);
            } finally {
                setLoading(false);
            }
        };

        const handleLogout = () => {
            localStorage.removeItem("token");
            window.location.href = "/";
        };

        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Dashboard</Typography>
                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={form.personalDetails.name || ""}
                        onChange={handleChange}
                        fullWidth
                        disabled={loading}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.personalDetails.email || ""}
                        onChange={handleChange}
                        fullWidth
                        disabled={loading}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={form.personalDetails.phone || ""}
                        onChange={handleChange}
                        fullWidth
                        disabled={loading}
                        error={!!phoneError}
                        helperText={phoneError}
                    />
                    {/* Add more fields as needed */}
                    <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Portfolio"}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleLogout} disabled={loading}>
                        Logout
                    </Button>
                </Box>
            </Box>
        );
    };

    export default Dashboard;