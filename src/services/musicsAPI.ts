const getMusics = async (id: number) => {
  const request = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&entity=song`
  );
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
