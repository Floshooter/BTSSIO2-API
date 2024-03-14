const request = require('supertest');
const app = require('../server');

jest.mock('../middleware/authorization.js', () => ({
    authenticator: jest.fn((req, res, next) => next()),
}))
jest.mock('../middleware/isAdmin.js', () => ({
    isAdmin: jest.fn((req, res, next) => next()),
}))
// Users routes
describe('Test users', () => {
    test('Afficher les utilisateurs', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toEqual(200);
    });
})
describe('Test users', () => {
    test('Afficher l\'utilisateur d\'id 34', async () => {
        const response = await request(app).get('/users/id/34');
        expect(response.status).toEqual(200);
    });
})
describe('Test users', () => {
    test('Afficher l\'utilisateur d\'email f.bernier@ecole-ipssi.net', async () => {
        const response = await request(app).get('/users/email/f.bernier@ecole-ipssi.net');
        expect(response.status).toEqual(200);
    });
})
describe('Test users', () => {
    test('Inscrire un utilisateur', async () => {
        const response = await request(app)
            .post('/users/inscription')
            .send({
                firstname: "John",
                lastname: "Doe",
                username: "john_doe123",
                email: "john.doe@example.com",
                password: "password123",
                country: "United States",
                perm_level: 0
            })
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({token: response.body.token});

    });
})
describe('Test users', () => {
    test('Connecter un utilisateur', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: "a.lemercier@m2l.fr",
                password: "angela@staff"
            })
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({token : response.body.token, user: response.body.user});
    });
})
describe('Test users', () => {
    test('Ajouter un employé', async () => {
        const response = await request(app)
            .post('/users/addemployee')
            .send({
                firstname: "Alice",
                lastname: "Dubois",
                username: "alice_dub",
                email: "alice.dubois@example.com",
                password: "Password$123",
                country: "Canada",
                perm_level: 1
            })
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({token: response.body.token});
    });
})
describe('Test users', () => {
    test('Mettre à jour un utilisateur', async () => {
        const response = await request(app)
            .put('/users/updateUser/41')
            .send({
                field: "username",
                value: "Angela1"
            })
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({"message": "User updated successfully"});
    });
})

// Boutique routes
describe('Test boutique', () => {
    test('Afficher les produits', async () => {
        const response = await request(app).get('/boutique');
        expect(response.status).toEqual(200);
    });
})
describe('Test boutique', () => {
    test('Afficher l\'id du produit d\'id 3', async () => {
        const response = await request(app).get('/boutique/id/3');
        expect(response.status).toEqual(200);
    });
})
describe('Test boutique', () => {
    test('Ajouter un produit', async () => {
        const res = await request(app)
            .post('/boutique/additem')
            .send({
                id_category: "5",
                item_name: "Ballon de volleyball",
                description: "Ballon de volleyball officiel de taille réglementaire",
                thumbnail: "",
                stocks: 10,
                price: 24.99
            })
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({"affectedRows": res.body.affectedRows, "insertId": res.body.insertId, "warningStatus": res.body.warningStatus});
    });
})
describe('Test boutique', () => {
    test('Afficher les categories', async () => {
        const res = await request(app)
            .get('/boutique/category');
        expect(res.status).toEqual(200);
    });
})
// describe('Test boutique', () => {
//     test('Mettre à jour le stock d\'un produit', async () => {
//         const res = await request(app)
//             .put('/boutique/updatestocks/3')
//             .send({
//                 stocks: 0
//             })
//         expect(res.status).toEqual(200);
//         expect(res.body).toEqual({ message: 'Stock mis à jour avec succès.' })
//     });
// })
describe('Test boutique', () => {
    test('Affiche les produits par nom', async () => {
        const res = await request(app)
            .get('/boutique/s?name=ab');
        expect(res.status).toEqual(200);
    });
})
// describe('Test boutique', () => {
//     test('Supprimer un produit', async () => {
//         const res = await request(app)
//             .delete('/deleteitem/37');
//         expect(res.status).toEqual(200);
//     });
// })

// Article routes
describe('Test article', () => {
    test('Afficher les paniers', async () => {
        const response = await request(app).get('/article/getCart/40');
        expect(response.status).toEqual(200);
    });
})
describe('Test article', () => {
    test('Ajouter un product dans le panier', async () => {
        const response = await request(app)
            .post('/article/add')
            .send({
                itemId: 11,
                item_name: "Corde à sauter",
                quantity: 2,
                basePrice: 11.99,
                userId: 35
            })
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({"message": "L'article a été ajouté au panier avec succès."})
    });
})