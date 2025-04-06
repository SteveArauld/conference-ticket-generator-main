# Frontend Mentor - Solution pour le générateur de billets de conférence

Ceci est une solution au [défi du générateur de billets de conférence sur Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Les défis Frontend Mentor vous aident à améliorer vos compétences en codage en créant des projets réalistes.

## Table des matières

- [Aperçu](#aperçu)
  - [Le défi](#le-défi)
  - [Capture d'écran](#capture-décran)
  - [Liens](#liens)
- [Mon processus](#mon-processus)
  - [Technologies utilisées](#technologies-utilisées)
  - [Ce que j'ai appris](#ce-que-jai-appris)
  - [Développement futur](#développement-futur)
  - [Ressources utiles](#ressources-utiles)
- [Auteur](#auteur)
- [Remerciements](#remerciements)

## Aperçu

### Le défi

Les utilisateurs doivent pouvoir :

- Remplir le formulaire avec leurs informations
- Recevoir des messages de validation si :
  - Un champ est manquant
  - L'adresse email n'est pas correctement formatée
  - L'avatar téléchargé est trop lourd ou dans un mauvais format
- Remplir le formulaire uniquement avec leur clavier
- Avoir les champs, indications et messages d'erreur annoncés par leur lecteur d'écran
- Voir le billet de conférence généré après soumission réussie du formulaire
- Avoir une mise en page optimale selon la taille de leur écran
- Voir les états hover et focus pour tous les éléments interactifs

### Capture d'écran

![](./screenshot.jpg)

### Liens

- URL de la solution : [Ajouter l'URL de la solution ici](https://github.com/SteveArauld/conference-ticket-generator-main)
- URL du site en ligne : [Ajouter l'URL du site en ligne ici](https://your-live-site-url.com)

## Mon processus

### Technologies utilisées

- Balisage HTML5 sémantique
- Propriétés CSS personnalisées
- Flexbox
- CSS Grid
- Approche mobile-first
- [React](https://reactjs.org/) - Bibliothèque JS
- [Next.js](https://nextjs.org/) - Framework React
- [Styled Components](https://styled-components.com/) - Pour les styles

### Ce que j'ai appris

J'ai notamment appris à :

```css
/* Validation de formulaire accessible */
.form-error {
    display: none;
    align-items: center;
    gap: 8px;
    color: var(--orange-500);
}
```

```js
// Gestion des fichiers image
const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
        setError('Fichier trop volumineux');
    }
};
```

### Développement futur

Je souhaite approfondir :
- L'accessibilité avancée (ARIA, navigation au clavier)
- Les tests automatisés
- L'optimisation des performances

### Ressources utiles

- [Guide d'accessibilité MDN](https://developer.mozilla.org/fr/docs/Web/Accessibility) - Excellente référence pour l'accessibilité
- [CSS Tricks](https://css-tricks.com/) - Pour les techniques CSS avancées

## Auteur

- Site web - [Kg steve](youtube.com/channel/UC4WD0P2D038rEdN97gJqbQg/?sub_confirmation=1)
- Frontend Mentor - [@SteveArauld](https://www.frontendmentor.io/profile/SteveArauld)
- Youtube - [@Kg_steve](youtube.com/channel/UC4WD0P2D038rEdN97gJqbQg/?sub_confirmation=1)

## Remerciements

Un grand merci à la communauté Frontend Mentor pour les retours constructifs.