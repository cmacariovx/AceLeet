const readJsonFile = async (filename: string) => {
    try {
      const response = await fetch(filename);
      const jsonObject = await response.json();
      return jsonObject;
    } catch (err) {
      console.error(`Error reading file: ${err}`);
      return null;
    }
};

export default readJsonFile;
