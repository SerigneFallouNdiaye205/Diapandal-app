import "../styles/Inscription.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Inscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur du champ lorsqu'il est modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom complet est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Veuillez confirmer le mot de passe";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/register', formData);
      
      if (response.status === 201) {
        alert('✅ Inscription réussie ! Vous pouvez maintenant vous connecter.');
        navigate('/Identification');
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ 
          general: error.message || "Une erreur s'est produite lors de l'inscription" 
        });
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
          <h2>S'inscrire</h2>

          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <div className="error-message">
                {Array.isArray(errors.name) ? errors.name[0] : errors.name}
              </div>
            )}
          </div>

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
                {Array.isArray(errors.email) ? errors.email[0] : errors.email}
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
                {Array.isArray(errors.password) ? errors.password[0] : errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <input 
              type="password"
              name="password_confirmation"
              placeholder="Confirmer le mot de passe" 
              value={formData.password_confirmation}
              onChange={handleChange}
              disabled={loading}
              className={errors.password_confirmation ? 'error' : ''}
            />
            {errors.password_confirmation && (
              <div className="error-message">
                {Array.isArray(errors.password_confirmation) 
                  ? errors.password_confirmation[0] 
                  : errors.password_confirmation
                }
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={loading ? 'loading' : ''}
          >
            {loading ? "⏳ Inscription en cours..." : "S'inscrire"}
          </button>

          <p className="separator">ou</p>
          
          <Link to="/Identification" className="login-link">
            <button type="button" disabled={loading}>
              Se connecter
            </button>
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Inscription;