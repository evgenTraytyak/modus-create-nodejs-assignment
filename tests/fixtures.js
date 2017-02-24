module.exports = {
  notEmptyResponse: {
    input: {
      Count: 4,
      Message: 'Results returned successfully',
      Results: [
        { VehicleDescription: '2015 Audi A3 4 DR AWD', VehicleId: 9403 },
        { VehicleDescription: '2015 Audi A3 4 DR FWD', VehicleId: 9408 },
        { VehicleDescription: '2015 Audi A3 C AWD', VehicleId: 9405 },
        { VehicleDescription: '2015 Audi A3 C FWD', VehicleId: 9406 },
      ],
    },
    output: {
      Count: 4,
      Results: [
        { Description: '2015 Audi A3 4 DR AWD', VehicleId: 9403 },
        { Description: '2015 Audi A3 4 DR FWD', VehicleId: 9408 },
        { Description: '2015 Audi A3 C AWD', VehicleId: 9405 },
        { Description: '2015 Audi A3 C FWD', VehicleId: 9406 },
      ],
    },
  },
  emptyResponse: {
    input: {
      Count: 0,
      Message: 'No results found for this request',
      Results: [],
    },
    output: {
      Count: 0,
      Results: [],
    },
  },
  errorResponse: {
    input: {
      ResponseStatus: {
        ErrorCode: 'SerializationException',
        Message: 'KeyValueDataContractDeserializer: Error converting to type: Input string was not in a correct format.',
      },
    },
    output: {
      Count: 0,
      Results: [],
    },
  },
  notEmptyResponseWithRating: {
    input: {
      Count: 2,
      Message: 'Results returned successfully',
      Results: [
        { VehicleDescription: '2015 Toyota Yaris 3 HB FWD', VehicleId: 9791 },
        { VehicleDescription: '2015 Toyota Yaris Liftback 5 HB FWD', VehicleId: 9146 },
      ],
    },
    output: {
      Count: 2,
      Results: [
        { Description: '2015 Toyota Yaris 3 HB FWD', VehicleId: 9791, CrashRating: 'Not Rated' },
        { Description: '2015 Toyota Yaris Liftback 5 HB FWD', VehicleId: 9146, CrashRating: '4' },
      ],
    },
    vehicles: {
      9791: {
        Count: 1,
        Message: 'Results returned successfully',
        Results: [{
          OverallRating: 'Not Rated',
          OverallFrontCrashRating: 'Not Rated',
          FrontCrashDriversideRating: 'Not Rated',
          FrontCrashPassengersideRating: 'Not Rated',
          OverallSideCrashRating: 'Not Rated',
          SideCrashDriversideRating: 'Not Rated',
          SideCrashPassengersideRating: 'Not Rated',
          RolloverRating: 'Not Rated',
          RolloverRating2: 'Not Rated',
          RolloverPossibility: 0,
          RolloverPossibility2: 0,
          SidePoleCrashRating: 'Not Rated',
          ComplaintsCount: 5,
          RecallsCount: 3,
          InvestigationCount: 0,
          ModelYear: 2015,
          Make: 'TOYOTA',
          Model: 'YARIS',
          VehicleDescription: '2015 Toyota Yaris 3 HB FWD',
          VehicleId: 9791,
        }],
      },
      9146: {
        Count: 1,
        Message: 'Results returned successfully',
        Results: [{
          VehiclePicture: 'http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2015/v07605P076.jpg',
          OverallRating: '4',
          OverallFrontCrashRating: '4',
          FrontCrashDriversideRating: '5',
          FrontCrashPassengersideRating: '4',
          FrontCrashPicture: 'http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2015/v07605P077.jpg',
          FrontCrashVideo: 'http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/movies/2015/v07605C021.wmv',
          OverallSideCrashRating: '5',
          SideCrashDriversideRating: '5',
          SideCrashPassengersideRating: '5',
          SideCrashPicture: 'http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2015/v07602P103.jpg',
          SideCrashVideo: 'http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/movies/2015/v07602C001.wmv',
          RolloverRating: '4',
          RolloverRating2: 'Not Rated',
          RolloverPossibility: 0.136,
          RolloverPossibility2: 0,
          SidePoleCrashRating: '4',
          SidePolePicture: 'http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/images/2015/v07600P070.jpg',
          SidePoleVideo: 'http://www.safercar.gov/staticfiles/DOT/safercar/ncapmedia/movies/2015/v07600C001.wmv',
          ComplaintsCount: 5,
          RecallsCount: 3,
          InvestigationCount: 0,
          ModelYear: 2015,
          Make: 'TOYOTA',
          Model: 'YARIS',
          VehicleDescription: '2015 Toyota Yaris Liftback 5 HB FWD',
          VehicleId: 9146,
        }],
      },
    },
  },
  notEmptyResponseWithoutRating: {
    input: {
      Count: 2,
      Message: 'Results returned successfully',
      Results: [
        { VehicleDescription: '2015 Toyota Yaris 3 HB FWD', VehicleId: 9791 },
        { VehicleDescription: '2015 Toyota Yaris Liftback 5 HB FWD', VehicleId: 9146 },
      ],
    },
    output: {
      Count: 2,
      Results: [
        { Description: '2015 Toyota Yaris 3 HB FWD', VehicleId: 9791 },
        { Description: '2015 Toyota Yaris Liftback 5 HB FWD', VehicleId: 9146 },
      ],
    },
  },
};
