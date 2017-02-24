/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const NHTSAService = require('../services/NHTSAService');
const fixtures = require('./fixtures');

const NHTSA_API_URL = 'https://one.nhtsa.gov/webapi/api/SafetyRatings';
const NHTSAApi = new NHTSAService();
const expect = chai.expect;

chai.use(chaiHttp);

describe('/GET vehicles', () => {
  const axiosMock = new MockAdapter(axios);
  const testFunction = (params, queries, matchedData, done) => {
    NHTSAApi.getData(params, queries)
      .then((data) => {
        expect(data).deep.equal(matchedData);
      })
      .then(done, done);
  };

  afterEach(() => axiosMock.reset());

  it('it should return expected JSON for Audi A3 2015', (done) => {
    const params = { modelYear: '2015', manufacturer: 'Audi', model: 'A3' };
    const url = `${NHTSA_API_URL}/modelyear/${params.modelYear}/make/${params.manufacturer}/model/${params.model}?format=json`;
    const responseData = fixtures.notEmptyResponse.input;
    const matchedData = fixtures.notEmptyResponse.output;

    axiosMock.onGet(url).reply(200, responseData);

    testFunction(params, {}, matchedData, done);
  });

  it('it should return empty JSON for Ford Crown Victoria 2015', (done) => {
    const params = { modelYear: '2015', manufacturer: 'Ford', model: 'Crown Victoria' };
    const url = `${NHTSA_API_URL}/modelyear/${params.modelYear}/make/${params.manufacturer}/model/${params.model}?format=json`;
    const responseData = fixtures.emptyResponse.input;
    const matchedData = fixtures.emptyResponse.output;

    axiosMock.onGet(url).reply(200, responseData);

    testFunction(params, {}, matchedData, done);
  });

  it('it should return empty JSON for Ford Fusion without model year', (done) => {
    const params = { modelYear: 'undefined', manufacturer: 'Ford', model: 'Fusion' };
    const url = `${NHTSA_API_URL}/modelyear/${params.modelYear}/make/${params.manufacturer}/model/${params.model}?format=json`;
    const responseData = fixtures.errorResponse.input;
    const matchedData = fixtures.errorResponse.output;

    axiosMock.onGet(url).reply(400, responseData);

    testFunction(params, {}, matchedData, done);
  });

  it('it should return expected JSON for Toyota Yaris 2015 with CrashRating if rating true', (done) => {
    const params = { modelYear: '2015', manufacturer: 'Toyota', model: 'Yaris' };
    const url = `${NHTSA_API_URL}/modelyear/${params.modelYear}/make/${params.manufacturer}/model/${params.model}?format=json`;
    const responseData = fixtures.notEmptyResponseWithRating.input;
    const matchedData = fixtures.notEmptyResponseWithRating.output;
    const vehicle9791 = fixtures.notEmptyResponseWithRating.vehicles[9791];
    const vehicle9146 = fixtures.notEmptyResponseWithRating.vehicles[9146];

    axiosMock.onGet(url).reply(200, responseData);
    axiosMock.onGet(`${NHTSA_API_URL}/VehicleId/9791?format=json`).reply(200, vehicle9791);
    axiosMock.onGet(`${NHTSA_API_URL}/VehicleId/9146?format=json`).reply(200, vehicle9146);

    testFunction(params, { withRating: 'true' }, matchedData, done);
  });

  it('it should return expected JSON for Toyota Yaris 2015 without CrashRating if rating not true', (done) => {
    const params = { modelYear: '2015', manufacturer: 'Toyota', model: 'Yaris' };
    const url = `${NHTSA_API_URL}/modelyear/${params.modelYear}/make/${params.manufacturer}/model/${params.model}?format=json`;
    const responseData = fixtures.notEmptyResponseWithoutRating.input;
    const matchedData = fixtures.notEmptyResponseWithoutRating.output;

    axiosMock.onGet(url).reply(200, responseData);

    testFunction(params, { withRating: 'false' }, matchedData, done);
  });

  it('it should return empty JSON for Honda Accord without modelYear param', (done) => {
    const params = { manufacturer: 'Honda', model: 'Accord' };
    const url = `${NHTSA_API_URL}/modelyear/${undefined}/make/${params.manufacturer}/model/${params.model}?format=json`;
    const responseData = fixtures.emptyResponse.input;
    const matchedData = fixtures.emptyResponse.output;

    axiosMock.onGet(url).reply(400, responseData);

    testFunction(params, {}, matchedData, done);
  });
});
