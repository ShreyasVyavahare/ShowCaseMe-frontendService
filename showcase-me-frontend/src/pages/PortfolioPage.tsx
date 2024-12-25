import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPortfolio } from "../services/portfolioService";
import { Box, Typography, Paper } from "@mui/material";

const PortfolioPage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [portfolio, setPortfolio] = useState<any | null>(null);

    useEffect(() => {
        const getPortfolio = async () => {
            try {
                const data = await fetchPortfolio(username!);
                setPortfolio(data);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
                setPortfolio(null);
            }
        };

        getPortfolio();
    }, [username]);

    if (!portfolio) {
        return <Typography variant="h5">Portfolio not found</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">{portfolio.personalDetails?.name}</Typography>
                <Typography variant="body1">{portfolio.personalDetails?.email}</Typography>
                <Typography variant="body1">{portfolio.personalDetails?.phone}</Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>Skills:</Typography>
                <ul>
                    {portfolio.skills?.map((skill: string, index: number) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
                {/* Add similar sections for projects, experience, etc. */}
            </Paper>
        </Box>
    );
};

export default PortfolioPage;
