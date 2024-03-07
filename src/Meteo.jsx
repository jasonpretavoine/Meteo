import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const Meteo = () => {
  const [ville, setVille] = useState('');
  const [meteo, setMeteo] = useState(null);
  const apiKey = '9c587a0e629b45938f1135918240603';


  const fetchMeteo = async () => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ville}&lang=fr`;
    try {
        const response = await axios.get(url);
        setMeteo(response.data);
        console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      setMeteo(null);

    }
  };
  return (
    <>
      <TextField
        label="Recherchez une ville"
        variant="outlined"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={fetchMeteo}>
        Rechercher
      </Button>
      {meteo && (
        <Card>
          <CardContent>
            {/* Assurez-vous d'ajuster les champs ci-dessous en fonction de la structure de l'objet "weather" retourné par l'API */}
            <Typography variant="h5">Informations Météo de {meteo.location.name}</Typography>
            <Typography>Température: {meteo.current.temp_c}°C</Typography>
            <Typography>Condition: {meteo.current.condition.text}</Typography>
            <img src={meteo.current.condition.icon} alt="Weather Icon" />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Meteo;
