import "../styles/Identification.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Identification() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Cette fonction ne fait QUE mettre à jour formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // NE RIEN FAIRE d'autre - pas de setErrors ici
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const response = await api.post('/login', formData);
      
      if (response.status === 200) {
        // Seulement en cas de succès, on efface les erreurs
        setErrors({});
        const { user, access_token } = response.data;
        localStorage.setItem('auth_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      }
    } catch (error) {
      console.log('Erreur API:', error.response?.data);
      
      if (error.response?.status === 422) {
        const backendErrors = error.response.data.errors || {};
        const formattedErrors = {};
        Object.keys(backendErrors).forEach(key => {
          formattedErrors[key] = Array.isArray(backendErrors[key]) 
            ? backendErrors[key][0] 
            : backendErrors[key];
        });
        setErrors(formattedErrors);
        
      } else if (error.response?.status === 404) {
        setErrors({ email: 'Aucun compte trouvé avec cette adresse email.Créer un compte !' });
        
      } else if (error.response?.status === 401) {
        setErrors({ password: 'Mot de passe incorrect.' });
      } else {
        setErrors({ general: "Erreur de connexion" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="formulaire">
        <section className="Messagedaccueil">
          <div className="text1">
            <h1>Diapandal</h1>
            <p>Vivez un excellent Magal avec Diapandal</p>
          </div>
        </section>

        <form onSubmit={handleSubmit} noValidate>
          <h2>Se connecter</h2>

          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder="Adresse email" 
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <div className="error-message">
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <input 
              type="password"
              name="password"
              placeholder="Mot de passe" 
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <div className="error-message">
                {errors.password}
              </div>
            )}
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? "⏳ Vérification..." : "Se connecter"}
          </button>

          <p className="separator">ou</p>
          
          <Link className="inscription-link" to="/Inscription">
            <button type="button" disabled={loading}>
              S'inscrire
            </button>
          </Link>

        </form>
      </section>
    </main>
  );
}

export default Identification;