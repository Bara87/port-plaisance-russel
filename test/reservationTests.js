const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../express'); // Assurez-vous que le chemin est correct vers votre fichier express.js
const reservationService = require('../services/reservationService');
const { expect } = chai;

chai.use(chaiHttp);

describe('Reservation Controller Tests', () => {
    
    // Test pour obtenir toutes les réservations
    describe('GET /reservations/list', () => {
        it('devrait retourner toutes les réservations', async () => {
            const mockReservations = [
                { _id: '66f59871a50f443f4b80add4', clientName: 'Client 1' },
                { _id: '66f59871a50f443f4b80add5', clientName: 'Client 2' }
            ];

            const serviceStub = sinon.stub(reservationService, 'getAllReservations').resolves(mockReservations);

            const res = await chai.request(app).get('/reservations/list');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.reservations).to.be.an('array').that.has.length(2);

            serviceStub.restore();
        });

        it('devrait retourner une erreur serveur', async () => {
            const serviceStub = sinon.stub(reservationService, 'getAllReservations').rejects(new Error('Erreur serveur'));

            const res = await chai.request(app).get('/reservations/list');
            expect(res).to.have.status(500);
            expect(res.body.error).to.equal('Erreur serveur');

            serviceStub.restore();
        });
    });

    // Test pour obtenir une réservation par ID
    describe('GET /reservations/detail/:idReservation', () => {
        it('devrait retourner la réservation par ID', async () => {
            const mockReservation = { _id: '66f59871a50f443f4b80add4', clientName: 'Client 1' };

            const serviceStub = sinon.stub(reservationService, 'getReservationById').resolves(mockReservation);

            const res = await chai.request(app).get('/reservations/detail/66f59871a50f443f4b80add4');
            expect(res).to.have.status(200);
            expect(res.body.reservation).to.deep.equal(mockReservation);

            serviceStub.restore();
        });

        it('devrait retourner une erreur si la réservation n\'est pas trouvée', async () => {
            const serviceStub = sinon.stub(reservationService, 'getReservationById').resolves(null);

            const res = await chai.request(app).get('/reservations/detail/66f59871a50f443f4b80add4');
            expect(res).to.have.status(404);
            expect(res.body.error).to.equal('Reservation non trouvée');

            serviceStub.restore();
        });
    });

    // Test pour créer une nouvelle réservation
    describe('POST /reservations/create', () => {
        it('devrait créer une nouvelle réservation', async () => {
            const mockReservation = {
                _id: '66f59871a50f443f4b80add4',
                catwayNumber: 1, // catwayNumber est maintenant un nombre
                clientName: 'Client 1',
                boatName: 'Boat 1',
                checkIn: '2024-10-03',
                checkOut: '2024-10-10'
            };

            const serviceStub = sinon.stub(reservationService, 'createReservation').resolves(mockReservation);

            const res = await chai.request(app)
                .post('/reservations/create')
                .send({
                    catwayNumber: 1, // Utilisation d'un nombre ici
                    clientName: 'Client 1',
                    boatName: 'Boat 1',
                    checkIn: '2024-10-03',
                    checkOut: '2024-10-10'
                });

            expect(res).to.have.status(201);
            expect(res.body.reservation).to.deep.equal(mockReservation);

            serviceStub.restore();
        });

        it('devrait retourner une erreur si les champs sont manquants', async () => {
            const res = await chai.request(app).post('/reservations/create').send({
                catwayNumber: 1, // Assurez-vous que les champs requis sont là
                clientName: 'Client 1'
            });

            expect(res).to.have.status(400);
            expect(res.body.error).to.equal('Tous les champs sont obligatoires');
        });
    });

    // Test pour supprimer une réservation
    describe('POST /reservations/delete/:id', () => {
        it('devrait supprimer une réservation avec succès', async () => {
            const serviceStub = sinon.stub(reservationService, 'deleteReservation').resolves(true);

            const res = await chai.request(app)
                .post('/reservations/delete/66f59871a50f443f4b80add4')
                .send({ reservationId: '66f59871a50f443f4b80add4' });

            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Réservation supprimée avec succès.');

            serviceStub.restore();
        });

        it('devrait retourner une erreur si la réservation n\'est pas trouvée', async () => {
            const serviceStub = sinon.stub(reservationService, 'deleteReservation').resolves(null);

            const res = await chai.request(app)
                .post('/reservations/delete/66f59871a50f443f4b80add4')
                .send({ reservationId: '66f59871a50f443f4b80add4' });

            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('Réservation non trouvée.');

            serviceStub.restore();
        });

        it('devrait retourner une erreur en cas de problème serveur', async () => {
            const serviceStub = sinon.stub(reservationService, 'deleteReservation').rejects(new Error('Erreur serveur'));

            const res = await chai.request(app)
                .post('/reservations/delete/66f59871a50f443f4b80add4')
                .send({ reservationId: '66f59871a50f443f4b80add4' });

            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Erreur lors de la suppression de la réservation.');

            serviceStub.restore();
        });
    });
});