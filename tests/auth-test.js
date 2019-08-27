var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("Auth API", () => {
    describe("GET Auth Token /", () => {
        it("should login, then return menus", (done) => {
            chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .send(JSON.stringify({
                    query: `
                    query {
                        login(userName:"vishal", password:"123"){
                          token
                          userId
                          expiresIn
                        }
                      }
                    `
                }))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.login.should.have.property('token');

                    const token = res.body.data.login.token


                    chai.request(app)
                        .post('/graphql')
                        .set('content-type', 'application/json')
                        .set('authorization', 'Bearer ' + token)
                        .send(JSON.stringify({
                            query: `
                            query {
                                menus
                            }
                            `
                        }))
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.data.menus.should.be.a('array');
                            done();
                        })
                });
        });
    });
});