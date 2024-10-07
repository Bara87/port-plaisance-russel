const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../express'); // Assurez-vous que le chemin est correct vers votre fichier express.js
const catwayService = require('../services/catwayService');

chai.use(chaiHttp);

describe('Catway Controller Tests', () => {
    
    // Réinitialiser les mocks après chaque test
    afterEach(() => {
        sinon.restore();
    });

    // Test de la route GET /list (tous les catways)
    describe('GET /list', () => {
        it('devrait retourner tous les catways avec un code 200', async () => {
            const mockCatways = [
                { catwayNumber: 1, type: 'A', catwayState: 'Disponible' },
                { catwayNumber: 2, type: 'B', catwayState: 'Occupé' }
            ];
            sinon.stub(catwayService, 'getAllCatways').resolves(mockCatways);

            const res = await chai.request(app).get('/list');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
        });

        it('devrait retourner une erreur 500 si le service échoue', async () => {
            sinon.stub(catwayService, 'getAllCatways').rejects(new Error('Erreur serveur'));

            const res = await chai.request(app).get('/list');
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('error', 'Erreur serveur');
        });
    });

    // Test de la route GET /detail/:id (catway par ID)
    describe('GET /detail/:id', () => {
        it('devrait retourner un catway par son ID avec un code 200', async () => {
            const mockCatway = { catwayNumber: 1, type: 'A', catwayState: 'Disponible' };
            sinon.stub(catwayService, 'getCatwayById').resolves(mockCatway);

            const res = await chai.request(app).get('/detail/1');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('catwayNumber', 1);
        });

        it('devrait retourner une erreur 404 si le catway est non trouvé', async () => {
            sinon.stub(catwayService, 'getCatwayById').resolves(null);

            const res = await chai.request(app).get('/detail/999');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('error', 'Catway non trouvé');
        });

        it('devrait retourner une erreur 500 si le service échoue', async () => {
            sinon.stub(catwayService, 'getCatwayById').rejects(new Error('Erreur serveur'));

            const res = await chai.request(app).get('/detail/1');
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('error', 'Erreur serveur');
        });
    });

    // Test de la route POST /create (création d'un catway)
    describe('POST /create', () => {
        it('devrait créer un nouveau catway et retourner un code 201', async () => {
            const mockCatway = { catwayNumber: 3, type: 'C', catwayState: 'Disponible' };
            sinon.stub(catwayService, 'createCatway').resolves(mockCatway);

            const res = await chai.request(app)
                .post('/create')
                .send({ catwayNumber: 3, type: 'C', catwayState: 'Disponible' });
            
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('catwayNumber', 3);
        });

        it('devrait retourner une erreur 400 si la création échoue', async () => {
            sinon.stub(catwayService, 'createCatway').rejects(new Error('Erreur lors de la création'));

            const res = await chai.request(app)
                .post('/create')
                .send({ catwayNumber: 3, type: 'C', catwayState: 'Disponible' });

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error', 'Erreur lors de la création');
        });
    });

    // Test de la route POST /updateState (mise à jour de l'état)
    describe('POST /updateState', () => {
        it('devrait mettre à jour l\'état d\'un catway et retourner un code 200', async () => {
            const mockCatway = { catwayNumber: 1, catwayState: 'Occupé' };
            sinon.stub(catwayService, 'updateCatwayState').resolves(mockCatway);

            const res = await chai.request(app)
                .post('/updateState')
                .send({ catwayNumber: 1, newCatwayState: 'Occupé' });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Catway mis à jour avec succès');
            expect(res.body.updatedCatway).to.have.property('catwayState', 'Occupé');
        });

        it('devrait retourner une erreur 400 si la mise à jour échoue', async () => {
            sinon.stub(catwayService, 'updateCatwayState').rejects(new Error('Erreur lors de la mise à jour'));

            const res = await chai.request(app)
                .post('/updateState')
                .send({ catwayNumber: 1, newCatwayState: 'Occupé' });

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error', 'Erreur lors de la mise à jour');
        });
    });

    // Test de la route POST /delete/:catwayNumber (suppression d'un catway)
    describe('POST /delete/:catwayNumber', () => {
        it('devrait supprimer un catway et retourner un code 200', async () => {
            const mockCatway = { catwayNumber: 1, type: 'A', catwayState: 'Supprimé' };
            sinon.stub(catwayService, 'deleteCatway').resolves(mockCatway);

            const res = await chai.request(app)
                .post('/delete/1');

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Catway supprimé avec succès');
        });

        it('devrait retourner une erreur 404 si le catway est non trouvé', async () => {
            sinon.stub(catwayService, 'deleteCatway').resolves(null);

            const res = await chai.request(app)
                .post('/delete/999');

            expect(res).to.have.status(404);
            expect(res.body).to.have.property('error', 'Catway non trouvé');
        });

        it('devrait retourner une erreur 500 si le service échoue', async () => {
            sinon.stub(catwayService, 'deleteCatway').rejects(new Error('Erreur lors de la suppression'));

            const res = await chai.request(app)
                .post('/delete/1');

            expect(res).to.have.status(500);
            expect(res.body).to.have.property('error', 'Erreur lors de la suppression');
        });
    });
});
