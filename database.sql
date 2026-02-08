-- Script de création et d'initialisation de la base de données QuizApp
-- ESSITECH - Projet de Sélection de Stage

-- Créer la base de données (à exécuter en tant que superuser)
-- CREATE DATABASE quizapp;

-- Se connecter à la base de données quizapp puis exécuter le reste

-- Supprimer les tables si elles existent (pour réinitialisation)
DROP TABLE IF EXISTS answer CASCADE;
DROP TABLE IF EXISTS question CASCADE;

-- Créer la table Question
CREATE TABLE question (
    id BIGSERIAL PRIMARY KEY,
    question_text VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL
);

-- Créer la table Answer
CREATE TABLE answer (
    id BIGSERIAL PRIMARY KEY,
    answer_text VARCHAR(300) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    question_id BIGINT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

-- Insérer 10 questions avec leurs réponses

-- Question 1 : ReactJS
INSERT INTO question (question_text, category) VALUES 
('Quel hook React est utilisé pour gérer l''état local d''un composant ?', 'ReactJS');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('useState', true, 1),
('useEffect', false, 1),
('useContext', false, 1),
('useReducer', false, 1);

-- Question 2 : ReactJS
INSERT INTO question (question_text, category) VALUES 
('Quelle méthode est appelée immédiatement après qu''un composant est monté dans le DOM ?', 'ReactJS');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('componentDidMount', true, 2),
('componentWillMount', false, 2),
('render', false, 2),
('constructor', false, 2);

-- Question 3 : SQL
INSERT INTO question (question_text, category) VALUES 
('Quelle commande SQL est utilisée pour récupérer des données d''une base de données ?', 'SQL');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('SELECT', true, 3),
('GET', false, 3),
('FETCH', false, 3),
('RETRIEVE', false, 3);

-- Question 4 : SQL
INSERT INTO question (question_text, category) VALUES 
('Quelle clause SQL est utilisée pour filtrer les résultats d''une requête ?', 'SQL');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('WHERE', true, 4),
('FILTER', false, 4),
('HAVING', false, 4),
('IF', false, 4);

-- Question 5 : Java
INSERT INTO question (question_text, category) VALUES 
('Quel mot-clé est utilisé pour créer une sous-classe en Java ?', 'Java');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('extends', true, 5),
('implements', false, 5),
('inherits', false, 5),
('super', false, 5);

-- Question 6 : Java
INSERT INTO question (question_text, category) VALUES 
('Quelle collection Java n''autorise pas les doublons ?', 'Java');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('Set', true, 6),
('List', false, 6),
('Map', false, 6),
('Queue', false, 6);

-- Question 7 : Spring Boot
INSERT INTO question (question_text, category) VALUES 
('Quelle annotation est utilisée pour marquer une classe comme contrôleur REST dans Spring Boot ?', 'Spring Boot');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('@RestController', true, 7),
('@Controller', false, 7),
('@Service', false, 7),
('@Component', false, 7);

-- Question 8 : Spring Boot
INSERT INTO question (question_text, category) VALUES 
('Quelle annotation JPA est utilisée pour définir une relation one-to-many ?', 'Spring Boot');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('@OneToMany', true, 8),
('@ManyToOne', false, 8),
('@OneToOne', false, 8),
('@ManyToMany', false, 8);

-- Question 9 : JavaScript
INSERT INTO question (question_text, category) VALUES 
('Quelle méthode JavaScript est utilisée pour parcourir un tableau ?', 'JavaScript');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('forEach', true, 9),
('for', false, 9),
('while', false, 9),
('loop', false, 9);

-- Question 10 : PostgreSQL
INSERT INTO question (question_text, category) VALUES 
('Quel type de données PostgreSQL est utilisé pour stocker des valeurs booléennes ?', 'PostgreSQL');

INSERT INTO answer (answer_text, is_correct, question_id) VALUES 
('BOOLEAN', true, 10),
('BOOL', false, 10),
('BIT', false, 10),
('TINYINT', false, 10);

-- Vérification des données insérées
SELECT 
    q.id as question_id,
    q.question_text,
    q.category,
    COUNT(a.id) as nombre_reponses
FROM question q
LEFT JOIN answer a ON q.id = a.question_id
GROUP BY q.id, q.question_text, q.category
ORDER BY q.id;
