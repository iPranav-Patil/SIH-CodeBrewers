export async function loadRailwayData() {
  const stationsResponse = await import('../Map API/stations.json');
  const stationsData = stationsResponse.default.features;
  console.log('Stations Data:', stationsData);
  // if (!Array.isArray(stationsData)) {
  //   throw new Error('Stations data is not an array');
  // }

  const trainsResponse = await import('../Map API/trains.json');
  const trainsData = trainsResponse.default.features;
  // if (!Array.isArray(trainsData)) {
  //   throw new Error('Stations data is not an array');
  // }
  // const schedulesResponse = await import('../Map API/schedules.json');
  // const schedulesData = schedulesResponse.default;
  // if (!Array.isArray(schedulesData)) {
  //   throw new Error('Stations data is not an array');
  // }



  return { stations: stationsData, trains: trainsData };
}