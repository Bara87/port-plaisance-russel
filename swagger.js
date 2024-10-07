const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Port de Plaisance Russell',
            version: '1.0.0',
            description: `
            API pour gérer les catways et les réservations du Port de Plaisance Russell.

            ## Glossaire :
            - **Catway** : Un petit appontement où les bateaux sont amarrés.
            - **Réservation** : Action de réserver un catway pour une période donnée.
            - **User** : Utilisateur qui effectue des réservations pour un catway.

            `,
            contact: {
                name: 'Équipe de développement',
                email: 'contact@port-russell.com',
            },
            servers: [
                {
                    url: 'http://localhost:6001',
                    description: 'Serveur local de développement'
                }
            ]
        },
        components: {
            schemas: {
                Reservation: {
                    type: 'object',
                    required: ['catwayNumber', 'clientName', 'boatName', 'checkIn', 'checkOut'],
                    properties: {
                        catwayNumber: {
                            type: 'integer',
                            description: 'Le numéro du catway réservé.'
                        },
                        clientName: {
                            type: 'string',
                            description: 'Le nom du client faisant la réservation.'
                        },
                        boatName: {
                            type: 'string',
                            description: 'Le nom du bateau amarré.'
                        },
                        checkIn: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date et heure d\'arrivée du bateau.'
                        },
                        checkOut: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date et heure de départ du bateau.'
                        }
                    }
                },
                Catway: {
                    type: 'object',
                    required: ['catwayNumber', 'type', 'catwayState'],
                    properties: {
                        catwayNumber: {
                            type: 'integer',
                            description: 'Le numéro du catway.'
                        },
                        type: {
                            type: 'string',
                            enum: ['long', 'short'],
                            description: 'Le type de catway (long ou short).'
                        },
                        catwayState: {
                            type: 'string',
                            description: 'L\'état du catway.'
                        }
                    }
                },
                User: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Le nom de l\'utilisateur.'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'L\'adresse e-mail de l\'utilisateur.'
                        },
                        password: {
                            type: 'string',
                            description: 'Le mot de passe de l\'utilisateur.'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};