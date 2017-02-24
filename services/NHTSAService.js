/* eslint no-console: 0 */

const axios = require('axios');

const NHTSA_API_URL = 'https://one.nhtsa.gov/webapi/api/SafetyRatings';

class NHTSAService {
  constructor() {
    this.prepareResult = (count = 0, results = []) => ({
      Count: count,
      Results: results,
    });
  }

  getData(params, queries = {}) {
    const { modelYear, manufacturer, model } = params;
    const withRating = queries.withRating === 'true';
    const url = `${NHTSA_API_URL}/modelyear/${modelYear}/make/${manufacturer}/model/${model}?format=json`;

    return axios.get(url)
      .then(response => this.responseMapper(response.data))
      .then(data => this.fetchRatings(data, withRating))
      .catch(() => this.prepareResult());
  }

  responseMapper(data) {
    const formattedResults = data.Results.map(result => ({
      Description: result.VehicleDescription,
      VehicleId: result.VehicleId,
    }));

    return this.prepareResult(data.Count, formattedResults);
  }

  ratingMapper(data, ratings) {
    const results = data.Results.map((result) => {
      const newResult = Object.assign({}, result);
      const vehicle = ratings.find(rating => rating.VehicleId === result.VehicleId);

      newResult.CrashRating = vehicle.OverallRating;

      return newResult;
    });

    return this.prepareResult(data.Count, results);
  }

  fetchRatings(data, withRating) {
    if (!withRating) return data;

    const requests = data.Results.map((result) => {
      const url = `${NHTSA_API_URL}/VehicleId/${result.VehicleId}?format=json`;

      return axios.get(url);
    });

    return axios.all(requests)
      .then(responses => responses.map(res => res.data.Results[0]))
      .then(ratings => this.ratingMapper(data, ratings));
  }
}

module.exports = NHTSAService;
