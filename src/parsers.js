import yaml from 'js-yaml';

const parsers = (fileType) => {
  const formats = {
    json: (data) => JSON.parse(data),
    yml: (data) => yaml.load(data),
    yaml: (data) => yaml.load(data),
  };
  return formats[fileType] ?? `Unknown format! ${fileType}`;
};
export default parsers;
