import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import Templatetwo from "../pages/template2";
import PortfolioPage from "../pages/PortfolioPage";
import { fetchPortfolio } from "../services/portfolioService";

interface Portfolio {
    templateId: string;
    // Add other fields as needed
}

const PortfolioWrapper: React.FC = () => {
    const { username } = useParams();
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPortfolio = async () => {
            try {
                if (username) {
                    const data = await fetchPortfolio(username);
                    setPortfolio(data);
                } else {
                    throw new Error("Username is undefined");
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        getPortfolio();
    }, [username]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    bgcolor: "black",
                }}
            >
                <CircularProgress sx={{ color: "#00ff41" }} />
                <Typography
                    variant="h6"
                    sx={{
                        color: "#00ff41",
                        ml: 2,
                        fontFamily: '"Courier New", monospace',
                    }}
                >
                    LOADING DATA...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    bgcolor: "black",
                    color: "red",
                    fontFamily: '"Courier New", monospace',
                }}
            >
                ERROR: {error}
            </Box>
        );
    }

    if (!portfolio) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    bgcolor: "black",
                    color: "#00ff41",
                    fontFamily: '"Courier New", monospace',
                }}
            >
                NO PORTFOLIO DATA FOUND
            </Box>
        );
    }

    // Render Templatetwo if templateId === "0", otherwise render PortfolioPage
    return portfolio.templateId === "0" ? <Templatetwo /> : <PortfolioPage />;
};

export default PortfolioWrapper;