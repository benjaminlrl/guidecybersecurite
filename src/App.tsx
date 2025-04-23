import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  Lock,
  FileKey2,
  Building2,
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import '/public/style.css'; // Si tu veux inclure le CSS séparé


type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

const quiz: QuizQuestion[] = [
  {
    question: "Quelle est la meilleure pratique pour les mots de passe ?",
    options: [
      "Utiliser le même mot de passe partout",
      "Utiliser un gestionnaire de mots de passe",
      "Noter ses mots de passe sur papier",
      "Utiliser sa date de naissance"
    ],
    correctAnswer: 1
  },
  {
    question: "Comment identifier un email de phishing ?",
    options: [
      "L'email est bien écrit",
      "L'expéditeur est une grande entreprise",
      "Il demande des informations personnelles urgentes",
      "Il contient des pièces jointes"
    ],
    correctAnswer: 2
  },
  {
    question: "Quelle est la meilleure protection contre les ransomwares ?",
    options: [
      "Avoir un antivirus à jour",
      "Faire des sauvegardes régulières",
      "Utiliser un VPN",
      "Changer ses mots de passe"
    ],
    correctAnswer: 1
  },
  {
    question: "Que faire si un site demande vos informations bancaires par email ?",
    options: [
      "Répondre rapidement pour ne pas bloquer son compte",
      "Vérifier l'urgence auprès de sa banque",
      "Ne jamais répondre à ce type d'email",
      "Donner uniquement le numéro de carte"
    ],
    correctAnswer: 2
  },
  {
    question: "Quelle est la longueur minimale recommandée pour un mot de passe ?",
    options: [
      "6 caractères",
      "8 caractères",
      "12 caractères",
      "4 caractères"
    ],
    correctAnswer: 2
  },
  {
    question: "Comment sécuriser son réseau Wi-Fi ?",
    options: [
      "Utiliser WPA3 ou WPA2",
      "Laisser le réseau ouvert",
      "Utiliser WEP",
      "Désactiver le mot de passe"
    ],
    correctAnswer: 0
  },
  {
    question: "Quelle pratique est la plus sûre pour les mises à jour ?",
    options: [
      "Les faire quand on a le temps",
      "Les faire immédiatement",
      "Les ignorer",
      "Désactiver les mises à jour"
    ],
    correctAnswer: 1
  },
  {
    question: "Que faire si on reçoit un fichier inattendu ?",
    options: [
      "L'ouvrir pour voir",
      "Le supprimer directement",
      "Vérifier avec l'expéditeur",
      "Le transférer à un ami"
    ],
    correctAnswer: 2
  },
  {
    question: "Comment protéger ses données sur un ordinateur public ?",
    options: [
      "Se déconnecter après usage",
      "Laisser sa session ouverte",
      "Enregistrer ses mots de passe",
      "Utiliser le mode normal"
    ],
    correctAnswer: 0
  },
  {
    question: "Quelle est la meilleure pratique pour les sauvegardes ?",
    options: [
      "Une fois par an",
      "Jamais",
      "Régulièrement et automatiquement",
      "Quand on y pense"
    ],
    correctAnswer: 2
  },
  {
    question: "Que faire si on perd son téléphone ?",
    options: [
      "Attendre de le retrouver",
      "Bloquer immédiatement ses comptes",
      "Ne rien faire",
      "Acheter un nouveau"
    ],
    correctAnswer: 1
  },
  {
    question: "Comment choisir une question de sécurité ?",
    options: [
      "Utiliser une information publique",
      "Créer une réponse unique et la noter",
      "Utiliser son vrai nom",
      "Utiliser sa date de naissance"
    ],
    correctAnswer: 1
  },
  {
    question: "Quelle pratique est recommandée sur les réseaux sociaux ?",
    options: [
      "Partager sa localisation",
      "Accepter toutes les demandes",
      "Limiter les informations personnelles",
      "Utiliser son mot de passe partout"
    ],
    correctAnswer: 2
  },
  {
    question: "Comment sécuriser ses achats en ligne ?",
    options: [
      "Utiliser des sites sécurisés (https)",
      "Donner toutes ses informations",
      "Utiliser un réseau public",
      "Enregistrer sa carte bancaire"
    ],
    correctAnswer: 0
  },
  {
    question: "Que faire face à une tentative d'arnaque ?",
    options: [
      "Ignorer et supprimer",
      "Répondre poliment",
      "Donner des informations partielles",
      "Cliquer sur les liens"
    ],
    correctAnswer: 0
  },
  {
    question: "Comment protéger son smartphone ?",
    options: [
      "Ne pas mettre de code",
      "Utiliser un code simple",
      "Utiliser un code complexe ou biométrie",
      "Désactiver le verrouillage"
    ],
    correctAnswer: 2
  },
  {
    question: "Quelle est la meilleure pratique pour les applications ?",
    options: [
      "Installer tout ce qui est gratuit",
      "N'installer que depuis les stores officiels",
      "Accepter toutes les permissions",
      "Ignorer les mises à jour"
    ],
    correctAnswer: 1
  },
  {
    question: "Comment gérer ses cookies internet ?",
    options: [
      "Accepter tous les cookies",
      "Refuser tous les cookies",
      "Gérer selon ses besoins",
      "Ignorer les messages"
    ],
    correctAnswer: 2
  },
  {
    question: "Que faire si un site demande trop d'informations ?",
    options: [
      "Donner de fausses informations",
      "Tout remplir",
      "Chercher un autre site",
      "Ignorer les champs obligatoires"
    ],
    correctAnswer: 2
  },
  {
    question: "Comment reconnaître un site web sécurisé ?",
    options: [
      "Il a beaucoup de publicités",
      "Il a un cadenas dans la barre d'adresse",
      "Il demande beaucoup d'informations",
      "Il s'ouvre dans une nouvelle fenêtre"
    ],
    correctAnswer: 1
  }
];

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const calculateScore = () => {
    return quizAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const totalPages = Math.ceil(quiz.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = quiz.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="body-banner">
        <div id="banner" className="bg-gradient-to-r from-red-800 to-orange-900 text-white text-center py-8 text-[1.5rem]">
          ⚠️ Alerte de sécurité : <strong>Votre abonnement Netflix</strong> nécessite une action immédiate !
          <br />
          Seulement<strong> 2€ par mois</strong> si vous vous abonnez maintenant !
          <br />
          <a href="petflix.html" className="text-yellow-600 font-bold">Cliquez ici pour activer votre abonnement maintenant</a>
      </div>
      </div>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
            Cybersécurité : Guide Essentiel
          </h1>
          <p className="text-xl text-blue-200">Protégez-vous efficacement contre les menaces numériques</p>
          <div className="mt-6 p-4 bg-blue-800 bg-opacity-50 rounded-lg">
            <p className="text-sm text-blue-200">
              🔒 Confidentialité : Ce site est purement éducatif. Aucune donnée personnelle n'est collectée ni stockée. 
              Vos réponses au quiz sont traitées localement dans votre navigateur et ne sont jamais enregistrées.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-900">Pourquoi la cybersécurité est cruciale</h2>
          <p className="text-lg text-indigo-800 mb-4">
            Dans un monde de plus en plus connecté, la cybersécurité est devenue un enjeu majeur pour tous. 
            Les cyberattaques peuvent avoir des conséquences dévastatrices sur notre vie privée, nos finances 
            et notre travail.
          </p>
        </section>

        {/* Principaux Risques */}
        <section className="mb-12">
          <div 
            className="flex items-center justify-between cursor-pointer bg-white p-4 rounded-lg shadow-sm mb-2 hover:bg-red-50 transition-colors"
            onClick={() => toggleSection('risks')}
          >
            <h2 className="text-2xl font-bold flex items-center text-red-700">
              <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
              Principaux Risques
            </h2>
            <ChevronDown className={`w-6 h-6 text-red-500 transition-transform ${activeSection === 'risks' ? 'transform rotate-180' : ''}`} />
          </div>
          
          {activeSection === 'risks' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-bold mb-2 text-red-700">Phishing</h3>
                  <p className="text-red-900">Tentatives d'obtention frauduleuse d'informations personnelles par email ou messages.</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-bold mb-2 text-orange-700">Ransomware</h3>
                  <p className="text-orange-900">Logiciels malveillants qui chiffrent vos données et exigent une rançon.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="font-bold mb-2 text-yellow-700">Ingénierie Sociale</h3>
                  <p className="text-yellow-900">Manipulation psychologique pour obtenir des informations confidentielles.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-bold mb-2 text-purple-700">Malwares</h3>
                  <p className="text-purple-900">Logiciels malveillants conçus pour endommager ou infiltrer votre système.</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Bonnes Pratiques */}
        <section className="mb-12">
          <div 
            className="flex items-center justify-between cursor-pointer bg-white p-4 rounded-lg shadow-sm mb-2 hover:bg-green-50 transition-colors"
            onClick={() => toggleSection('practices')}
          >
            <h2 className="text-2xl font-bold flex items-center text-green-700">
              <Lock className="w-6 h-6 mr-2 text-green-500" />
              Bonnes Pratiques
            </h2>
            <ChevronDown className={`w-6 h-6 text-green-500 transition-transform ${activeSection === 'practices' ? 'transform rotate-180' : ''}`} />
          </div>

          {activeSection === 'practices' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
              <div className="space-y-6">
                <div className="flex items-start bg-green-50 p-4 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-green-700">Gestionnaire de mots de passe</h3>
                    <p className="text-green-900">Utilisez un gestionnaire de mots de passe pour créer et stocker des mots de passe uniques et complexes.</p>
                  </div>
                </div>
                <div className="flex items-start bg-emerald-50 p-4 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-emerald-700">Authentification à deux facteurs</h3>
                    <p className="text-emerald-900">Activez l'authentification à deux facteurs sur tous vos comptes importants.</p>
                  </div>
                </div>
                <div className="flex items-start bg-teal-50 p-4 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-teal-700">Mises à jour régulières</h3>
                    <p className="text-teal-900">Maintenez vos systèmes et logiciels à jour pour bénéficier des dernières corrections de sécurité.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section Entreprises */}
        <section className="mb-12">
          <div 
            className="flex items-center justify-between cursor-pointer bg-white p-4 rounded-lg shadow-sm mb-2 hover:bg-blue-50 transition-colors"
            onClick={() => toggleSection('enterprise')}
          >
            <h2 className="text-2xl font-bold flex items-center text-blue-700">
              <Building2 className="w-6 h-6 mr-2 text-blue-500" />
              Sécurité en Entreprise
            </h2>
            <ChevronDown className={`w-6 h-6 text-blue-500 transition-transform ${activeSection === 'enterprise' ? 'transform rotate-180' : ''}`} />
          </div>

          {activeSection === 'enterprise' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
              <div className="space-y-6">
                <h3 className="font-bold text-xl mb-4 text-blue-900">Mesures essentielles pour les entreprises</h3>
                <ul className="space-y-4">
                  <li className="flex items-start bg-blue-50 p-4 rounded-lg">
                    <FileKey2 className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-700">Politique de sécurité</h4>
                      <p className="text-blue-900">Établissez une politique de sécurité claire et formez régulièrement vos employés.</p>
                    </div>
                  </li>
                  <li className="flex items-start bg-indigo-50 p-4 rounded-lg">
                    <Shield className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-indigo-700">Protection du réseau</h4>
                      <p className="text-indigo-900">Mettez en place un pare-feu professionnel et segmentez votre réseau.</p>
                    </div>
                  </li>
                  <li className="flex items-start bg-violet-50 p-4 rounded-lg">
                    <Lock className="w-6 h-6 text-violet-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-violet-700">Gestion des accès</h4>
                      <p className="text-violet-900">Implémentez le principe du moindre privilège et gérez strictement les accès.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Quiz Interactif */}
        <section className="mb-12">
          <div 
            className="flex items-center justify-between cursor-pointer bg-white p-4 rounded-lg shadow-sm mb-2 hover:bg-purple-50 transition-colors"
            onClick={() => toggleSection('quiz')}
          >
            <h2 className="text-2xl font-bold flex items-center text-purple-700">
              <BookOpen className="w-6 h-6 mr-2 text-purple-500" />
              Testez vos Connaissances
            </h2>
            <ChevronDown className={`w-6 h-6 text-purple-500 transition-transform ${activeSection === 'quiz' ? 'transform rotate-180' : ''}`} />
          </div>

          {activeSection === 'quiz' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
              <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                <p className="text-purple-800 text-sm">
                  🔒 Note : Vos réponses au quiz sont traitées localement dans votre navigateur et ne sont jamais enregistrées ou partagées.
                </p>
              </div>
              {currentQuestions.map((q, qIndex) => {
                const actualIndex = startIndex + qIndex;
                return (
                  <div key={actualIndex} className="mb-6">
                    <h3 className="font-bold mb-3 text-purple-900">
                      Question {actualIndex + 1}: {q.question}
                    </h3>
                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          className={`w-full text-left p-3 rounded transition-colors ${
                            showResults
                              ? oIndex === q.correctAnswer
                                ? 'bg-green-100 border-green-500 text-green-900'
                                : quizAnswers[actualIndex] === oIndex
                                ? 'bg-red-100 border-red-500 text-red-900'
                                : 'bg-gray-100 text-gray-700'
                              : quizAnswers[actualIndex] === oIndex
                              ? 'bg-purple-100 border-purple-500 text-purple-900'
                              : 'bg-gray-100 hover:bg-purple-50 text-gray-700'
                          } border`}
                          onClick={() => !showResults && handleQuizAnswer(actualIndex, oIndex)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <button
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={currentPage === 0}
                >
                  Précédent
                </button>
                <span className="text-purple-700">
                  Page {currentPage + 1} sur {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  Suivant
                </button>
              </div>

              {!showResults && quizAnswers.length === quiz.length && (
                <button
                  className="mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors w-full"
                  onClick={() => setShowResults(true)}
                >
                  Voir les résultats
                </button>
              )}
              {showResults && (
                <div className="mt-6 p-4 bg-purple-50 rounded border border-purple-200">
                  <p className="text-lg font-bold text-purple-900">
                    Score: {calculateScore()} sur {quiz.length}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Ressources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
            <ExternalLink className="w-6 h-6 mr-2 text-gray-700" />
            Ressources Officielles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.ssi.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-blue-900">ANSSI</h3>
              <p className="text-blue-800">Agence nationale de la sécurité des systèmes d'information</p>
            </a>
            <a
              href="https://www.cybermalveillance.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-green-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-green-900">Cybermalveillance.gouv.fr</h3>
              <p className="text-green-800">Assistance et prévention du risque numérique</p>
            </a>
            <a
              href="https://www.cnil.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-purple-900">CNIL</h3>
              <p className="text-purple-800">Commission Nationale de l'Informatique et des Libertés</p>
            </a>
            <a
              href="https://www.enisa.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-indigo-900">ENISA</h3>
              <p className="text-indigo-800">Agence européenne pour la cybersécurité</p>
            </a>
          </div>
        </section>
        {/* Ressources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
            <ExternalLink className="w-6 h-6 mr-2 text-gray-700" />
            Quelques outils
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://haveibeenpwned.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-blue-900">Have I Been Pwned</h3>
              <p className="text-blue-800">Vérifier si un email ou un domaine a été compromis dans une violation de données.</p>
            </a>
            <a
              href="https://www.lemagit.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-green-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-green-900">LeMagIT</h3>
              <p className="text-green-800">Rester à jour sur les menaces actuelles.</p>
            </a>
            <a
              href="https://clusif.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-purple-900">Clusif</h3>
              <p className="text-purple-800">Association française qui regroupe des experts en cybersécurité et fournit des ressources sur les menaces informatiques et les incidents de sécurité.</p>
            </a>
            <a
              href="https://www.cvedetails.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-red-900">CVE details</h3>
              <p className="text-red-800">Connaitre les vulnérabilités et leurs impacts d'un site</p>
            </a>
            <a
              href="https://password.kaspersky.com/fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <h3 className="font-bold mb-2 text-indigo-900">Password Kaspersky</h3>
              <p className="text-indigo-800">Connaitre la robustesse de mon mot de passe</p>
            </a>            
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;