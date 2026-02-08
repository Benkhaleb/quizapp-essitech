# QuizApp - ESSITECH

Application web complète de type "Quiz" développée avec Spring Boot (backend) et ReactJS (frontend).

## Description

QuizApp est une application Full-Stack permettant aux utilisateurs de répondre à un questionnaire technique contenant 10 questions sur différents sujets (ReactJS, Java, Spring Boot, SQL, JavaScript, PostgreSQL). À la fin du quiz, l'utilisateur reçoit son score détaillé.

## Stack Technologique

- **Backend** : Java 17 avec Spring Boot 3.2.0
- **Frontend** : ReactJS 18.2.0
- **Base de données** : PostgreSQL
- **Build Tools** : Maven (backend), npm (frontend)

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

1. **Java Development Kit (JDK) 17 ou supérieur**
   - Vérification : `java -version`
   - Téléchargement : https://www.oracle.com/java/technologies/downloads/

2. **Maven 3.6 ou supérieur**
   - Vérification : `mvn -version`
   - Téléchargement : https://maven.apache.org/download.cgi

3. **Node.js 16 ou supérieur (avec npm)**
   - Vérification : `node -v` et `npm -v`
   - Téléchargement : https://nodejs.org/

4. **PostgreSQL 12 ou supérieur**
   - Vérification : `psql --version`
   - Téléchargement : https://www.postgresql.org/download/

## Configuration de la Base de Données

### Étape 1 : Créer la base de données

Connectez-vous à PostgreSQL en tant que superuser :

```bash
psql -U postgres
```

Créez la base de données :

```sql
CREATE DATABASE quizapp;
\q
```

### Étape 2 : Initialiser les tables et données

Exécutez le script SQL fourni :

```bash
psql -U postgres -d quizapp -f database.sql
```

### Étape 3 : Vérifier l'installation

Connectez-vous à la base de données :

```bash
psql -U postgres -d quizapp
```

Vérifiez que les tables sont créées :

```sql
\dt
SELECT COUNT(*) FROM question;
SELECT COUNT(*) FROM answer;
```

Vous devriez voir 10 questions et 40 réponses.

## Lancement du Projet

### Backend (Spring Boot)

1. Naviguez vers le dossier backend :

```bash
cd backend
```

2. **Configuration** : Vérifiez les paramètres de connexion dans `src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/quizapp
spring.datasource.username=postgres
spring.datasource.password=postgres
```

Modifiez le username et password si nécessaire selon votre installation PostgreSQL.

3. Compilez et lancez le backend :

```bash
mvn clean install
mvn spring-boot:run
```

Le backend sera accessible sur : **http://localhost:8080**

Vérification : Ouvrez http://localhost:8080/api/quiz dans votre navigateur. Vous devriez voir un JSON avec les questions.

### Frontend (React)

1. Ouvrez un **nouveau terminal** et naviguez vers le dossier frontend :

```bash
cd frontend
```

2. Installez les dépendances :

```bash
npm install
```

3. Lancez l'application React :

```bash
npm start
```

L'application s'ouvrira automatiquement dans votre navigateur sur : **http://localhost:3000**

## Utilisation de l'Application

1. Sur la page d'accueil, cliquez sur **"Démarrer le Quiz"**
2. Répondez aux questions une par une en sélectionnant votre réponse
3. Naviguez entre les questions avec les boutons **"Précédent"** et **"Suivant"**
4. Une fois toutes les questions répondues, cliquez sur **"Terminer et voir les résultats"**
5. Consultez votre score final et cliquez sur **"Recommencer le Quiz"** pour réessayer

## API Endpoints

### GET /api/quiz

Récupère toutes les questions du quiz (sans exposer les bonnes réponses).

**Réponse** :

```json
[
  {
    "id": 1,
    "questionText": "Quel hook React est utilisé...",
    "category": "ReactJS",
    "answers": [
      {
        "id": 1,
        "answerText": "useState"
      },
      ...
    ]
  }
]
```

### POST /api/quiz/submit

Soumet les réponses de l'utilisateur et calcule le score.

**Requête** :

```json
{
  "answers": {
    "1": 1,
    "2": 5,
    ...
  }
}
```

**Réponse** :

```json
{
  "score": 8,
  "totalQuestions": 10,
  "message": "Votre score : 8/10"
}
```

## Résolution de Problèmes

### Le backend ne démarre pas

- Vérifiez que PostgreSQL est lancé : `sudo service postgresql status`
- Vérifiez que la base de données `quizapp` existe
- Vérifiez les identifiants dans `application.properties`

### Le frontend affiche "Erreur lors du chargement"

- Assurez-vous que le backend est lancé sur le port 8080
- Vérifiez la console du navigateur (F12) pour voir les erreurs
- Vérifiez que CORS est activé dans `QuizController.java`

### Erreur "Port 8080 already in use"

- Un autre service utilise le port 8080
- Modifiez le port dans `application.properties` : `server.port=8081`
- Mettez à jour l'URL dans le frontend (`Quiz.js`) : `http://localhost:8081/api/quiz`

### Les questions ne s'affichent pas

- Vérifiez que les données sont bien insérées : `SELECT * FROM question;`
- Vérifiez les logs du backend pour voir les requêtes SQL

## ✅ Fonctionnalités Implémentées

- ✅ Page d'accueil avec bouton "Démarrer le Quiz"
- ✅ Chargement des questions depuis le backend
- ✅ Affichage des questions une par une
- ✅ Sélection unique de réponse par question
- ✅ Navigation entre les questions (Précédent/Suivant)
- ✅ Barre de progression
- ✅ Compteur de questions répondues
- ✅ Soumission des réponses au backend
- ✅ Calcul du score côté serveur
- ✅ Affichage des résultats avec pourcentage
- ✅ Option de recommencer le quiz
- ✅ Interface utilisateur moderne et responsive
- ✅ Gestion des erreurs

## Architecture Technique

### Backend (Spring Boot)

- **Modèle** : Entités JPA `Question` et `Answer` avec relation @OneToMany
- **Repository** : Interfaces Spring Data JPA pour l'accès aux données
- **Service** : Logique métier (calcul du score, conversion DTO)
- **Controller** : API REST avec CORS activé
- **DTO** : Objets de transfert pour ne pas exposer les informations sensibles

### Frontend (React)

- **Composants** : Architecture modulaire et réutilisable
- **Hooks** : useState pour l'état, useEffect pour les effets de bord
- **Axios** : Communication HTTP asynchrone avec le backend
- **CSS** : Styles modernes avec dégradés et animations

## Auteur : Khaleb Savadogo

Projet réalisé dans le cadre de la sélection de stage ESSITECH.

## 📄 Licence

Ce projet est développé à des fins éducatives.
