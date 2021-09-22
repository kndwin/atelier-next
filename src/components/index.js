import requireContext from 'require-context.macro';

const req = requireContext('.', true, /\.\/[^/]+\/[^/]+\/index\.jsx$/);

// Dynamically build an object containing all files from folder

req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.jsx/, '$1');
  module.exports[componentName] = req(key).default;
});
