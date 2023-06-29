import yaml from 'js-yaml';

const parsers = (readData, fileType) => {
  const formats = {
    json: (data) => JSON.parse(data),
    yml: (data) => yaml.load(data),
    yaml: (data) => yaml.load(data),
  };
  return formats[fileType] !== undefined ? formats[fileType](readData) : `Unknown format! ${fileType}`;
};
export default parsers;
